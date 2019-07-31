import React from "react";
import Helmet from 'react-helmet';
import Layout from '../../components/Layout'

export default class VerifyRsvp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  handleSubmit = e => {
    // Do absolutely nothing
    e.preventDefault();
  }

  handleChange = e => {
    this.throttledSetState({ [e.target.name]: e.target.value });
  };

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
              <h1>Verify RSVPs</h1>
              <p>Verify RSVPs for a particular DApps Dev Club event, 
                while preserving attendees' privacy.</p>

              <form
                name="contact"
                onSubmit={this.handleSubmit}
              >
                <div className="field">
                  <div className="control">
                    <input className="input" type={"text"} name={"text"} id={"text"} onChange={this.handleChange} required={true} />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
};
