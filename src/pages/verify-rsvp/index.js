import React from 'react';
import Helmet from 'react-helmet';
import ReactCsvReader from 'react-csv-reader';
import ReactFilterableTable from 'react-filterable-table';
import md5  from 'js-md5';

import throttle from '../qr/throttle';
import Layout from '../../components/Layout';

export default class VerifyRsvp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      tableFields: [],
      tableData: [],
    };
    this.throttledSetState = throttle(this.setState, 500);
  }

  handleSubmit = e => {
    // Do absolutely nothing
    e.preventDefault();
  }

  handleChange = e => {
    this.throttledSetState({ [e.target.name]: e.target.value });
  };

  handleCsvUploadError = error => {
    console.error(error);
  }

  handleCsvUpload = data => {
    const columns = data[0];
    const tableFields = [
      {
        name: 'firstName',
        displayName: 'First Name',
        inputFilterable: true,
        exactFilterable: false,
        sortable: true,
      },
      {
        name: 'lastName',
        displayName: 'Last Name',
        inputFilterable: true,
        exactFilterable: false,
        sortable: true,
      },
      {
        name: 'email',
        displayName: 'Email',
        inputFilterable: true,
        exactFilterable: false,
        sortable: true,
        render: this.renderEmail.bind(this),
      },
      {
        name: 'quantity',
        displayName: 'Tickets',
        inputFilterable: true,
        exactFilterable: false,
        sortable: true,
      },
      {
        name: 'order',
        displayName: 'Order #',
        inputFilterable: true,
        exactFilterable: false,
        sortable: true,
      },
    ];
    const tableData = data.slice(1).map((row) => {
      return columns.reduce((accumulator, column, columnIndex) => {
        return {
          ...accumulator,
          [column]: row[columnIndex] || 'Nil',
        }
      }, {});
    });
    console.log(tableData.slice(0,5));
    console.log(tableFields);
    this.setState({
      tableData,
      tableFields,
    });
  }

  renderEmail(props) {
    console.log('renderEmail', props);
    const component = this;
    const {
      value,
      record,
      filteredRecords,
    } = props;
    const orderId = record.order;
    if (filteredRecords.length > 10) {
      return (<span>{ value }</span>);
    } else {
      const inputElem = (<input
        id={`verify-email-input-${orderId}`}
        className={'verify-email-input'}
        type={'text'}
      ></input>);
      return (<div>
        <span>{ value }</span>
        <br />
        { inputElem }
        <button
          id={`verify-email-button-${orderId}`}
          className={'verify-email-button'}
          onClick={ component.verifyEmail(record, orderId).bind(component) }
        >Verify</button>
      </div>);
    }
  }

  verifyEmail(record, orderId) {
    const component = this;
    return (/* event */) => {
      const inputElem = document.getElementById(`verify-email-input-${orderId}`);
      const value = inputElem.value;
      console.log('verifyEmail closure', record, orderId, value);

      const salt = component.state.passPhraseInput;
      const saltedEmail = `${salt}-${value}`;
      const hashedAndSaltedEmail = md5(saltedEmail);
      const isCorrect = (record.email === hashedAndSaltedEmail);
      const displayMessage = isCorrect ?
        'Match' :
        'Does not match';

      // TODO display update within DOM instead of modal alert
      alert(displayMessage);
    };
  }

  renderTable() {
    if (this.state.tableData.length > 0) {
      return (<ReactFilterableTable
        namespace="VerifyRsvpTable"
        initialSort="firstName"
        data={this.state.tableData}
        fields={this.state.tableFields}
        noRecordsMessage={"There are no records"}
        noFilteredRecordsMessage={"There are no records that match the filters"}
        pageSize={50}
        pageSizes={[10,25,50]}
        topPagerVisible={false}
      />);
    } else {
      return null;
    }
  }

  render() {
    return (
      <Layout>
        <section className="section">
          <Helmet
            titleTemplate="%s | DApps Dev Club"
          >
            <title>Verify RSVPs</title>
          </Helmet>
          <div className="container">
            <div className="content">
              <div>
                <h1>Verify RSVPs</h1>
                <p>Verify RSVPs for a particular DApps Dev Club event,
                  while preserving attendees' privacy.</p>
                <h2>Instructions</h2>
                <ol>
                  <li>Upload the provided CSV file into the "CSV" field</li>
                  <li>Copy and paste the provided pass phrase into the "pass phrase" field</li>
                  <li>Type in the first name of the attendee into the "search" field</li>
                  <li>The full list will filter as you type</li>
                  <li>Select one of the attendees from the filtered list</li>
                </ol>
                <p>
                  If you wish to verify their email address, or any other "scrambled" data,
                  you need to ask them for it, and then do the following:
                </p>
                <ol>
                  <li>Enter the email address that they have provided into the field.</li>
                  <li>Click on the verify button.</li>
                  <li>You will be shown whether this email matches or does not match the one used during registration.</li>
                </ol>
              </div>
              <br />

              <form
                name="contact"
                onSubmit={this.handleSubmit}
              >
                <div className="field">
                  <div className="control">
                    <p>
                      <label htmlFor={"csvInput"}>CSV</label>
                      <br />
                      <ReactCsvReader
                        cssClass="csv-reader-input"
                        label="Select CSV file"
                        onFileLoaded={this.handleCsvUpload}
                        onError={this.handleCsvUploadError}
                        inputId="csvReaderInput"
                        inputStyle={{color: '#00c000'}}
                      />
                    </p>
                  </div>
                  <div className="control">
                    <p>
                      <label htmlFor={"passPhraseInput"}>Pass phrase</label>
                      <br />
                      <input
                        className="passPhraseInput"
                        type={"text"}
                        name={"passPhraseInput"}
                        id={"passPhraseInput"}
                        onChange={this.handleChange}
                        required={true}
                      />
                    </p>
                  </div>
                </div>
              </form>
              <br />

              { this.renderTable() }
              <br />

              <br />
              <div>
                <h2>Why not just provide the raw data?</h2>
                <p>
                  In one word: <strong>Privacy!</strong>
                </p>
                <p>
                  Longer version: There are various laws and regulations which prohibit the use of
                  personal data collected about from people from being stored, used, transmitted,
                  sold, or otherwise used for any purpose other than the original intent.
                  In this particular case, attendees have provided their details for the purposes
                  of registering for an event run by DApps Dev Club.
                  Event venues, however, do need to check that people attending an event
                  (1) really are who they claim to be, and
                  (2) are registered for the event that they claim to be going for.
                  The venue can satisfy the first requirement by requiring the attendee to show their
                  photo identity, or something similar, and this requires no involvement from
                  DApps Dev Club.
                  However, in order for the venue to be able to satisfy the second requirement,
                  DApps Dev Club does indeed need to communicate some information to them.
                  The question then really does become: What is is minimal amount of data needed to
                  do so?
                </p>
                <p>
                  Assuming that the venue has already satisfied the first requirement,
                  they already know the name of the attendee, and thus they should already be able to
                  satisfy the second requirement based on a list of names provided to them.
                  Conversely, by providing the venue with the names of attendees,
                  DApps Dev Club is furnishing the venue with only a <strong>subset</strong> of the information that
                  the attendee themselves would have <em>already</em> provided to the venue themselves.
                  This is a nice balance, and we could probably leave it at that.
                  However, some venues want more information than just the name,
                  presumably for additional points of verification, which in turn
                  presumably increases the level of security.
                  Further complicate this with the fact that the most commonly asked for additional
                  information is the email address, which is not present on most forms of photo identity.
                  This presents a privacy oriented conundrum, in which DApps Dev Club
                  does not want to provide private information of the attendees to the venue,
                  and at the same time is being asked to do so with building security being cited as the concern.
                </p>
                <p>
                  In order to solve this, one solution might be to implement a
                  zero knowledge proof based system that would be able to prove attendance for a given identity.
                  Practically though, there are no existing tools that accomplish this -
                  someone should totally build this!
                  Instead, a far simpler solution would simply be for the venue to ask the attendee
                  to provide their email address, and then use that to verify if it matches the RSVP data.
                  This can be accomplished using a simple hash and salt mechanism that is similar to that
                  which is employed by most password based user authentication systems.,
                  and that is what is available here.
                </p>
              </div>

            </div>
          </div>
        </section>
      </Layout>
    );
  }
};
