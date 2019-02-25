import React from "react";
import Helmet from 'react-helmet';
import Layout from '../../components/Layout'
import QrCode from '../../components/QrCode';
import throttle from './throttle';

export default class Cert extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.throttledSetState = throttle(this.setState, 500);
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
            <title>QR codes</title>
          </Helmet>
          <div className="container">
            <div className="content">
              <h1>QR codes</h1>
              <p>Generate a QR code dynamically for us in presentations, live demos, et cetera.</p>

              <QrCode
                url={this.state.text}
                logoUrl="https://dappsdev.org/img/dadc-logo.png"
              ></QrCode>

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
