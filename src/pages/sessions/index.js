import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../../components/Layout';

import sessionData from './session-data.json';

export default class Sessions extends React.Component {
  constructor(props) {
    super(props);

    const { lastUpdated, sessions, locations } = sessionData;
    const locationMap = new Map();
    locations.forEach((location) => {
      locationMap.set(location.id, location);
    });
    const lastUpdatedStamp = +(new Date(lastUpdated));
    const upcomingSessions = [];
    const pastSessions = [];

    sessions.forEach((session) => {
      const location =
        locationMap.get(session.location.id) ||
        { ...session.location, name: 'NOT FOUND' };
      const sessionTime = new Date(session.time.start);
      const displayTime = sessionTime.toLocaleDateString(session.time.locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: session.time.tz,
      });
      const time = {
        ...session.time,
        name: displayTime,
      };

      const parsedSession = {
        ...session,
        location,
        time,
      };
      if (+sessionTime > lastUpdatedStamp) {
        upcomingSessions.push(parsedSession);
      } else {
        pastSessions.push(parsedSession);
      }
    });

    this.state = {
      upcomingSessions,
      pastSessions,
    };
  }

  renderSessionsList(sessions) {
    if (sessions.length < 1) {
      return (
        <p>
          (none)
        </p>
      );
    }
    return (
      <ul>
        { sessions.map((session) => {
          return (<li key={session.id}>
            <h3>
              {session.name}
            </h3>
            <p>
              <span>Location: </span>
              <span>{session.location.name}</span>
            </p>
            <p>
              <span>Time: </span>
              <span>{session.time.name}</span>
            </p>
            <p>
              <a
                className="navbar-item"
                href="https://www.meetup.com/BlockChain-Dapps-Technology/events/257675124/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>RSVP</span>
              </a>
            </p>
          </li>);
        }) }
      </ul>
    );
  }

  render() {
    console.log(this.state);
    return (
      <Layout>
        <section className="section">
          <Helmet
            titleTemplate="%s | DApps Dev Club"
          >
            <title>Sessions</title>
          </Helmet>
          <div className="container">
            <div className="content">
              <h1>Sessions</h1>
              <p>
                We maintain a live list of all the sessions run by the club here.
                Since we tailor each session based on the outcome of the one that just concluded,
                expect this list to change as we progress.
              </p>
              <p>
                Each session will link to an external site (meetup.com), where we would like you
                to RSVP in order for the organisers to plan for numbers in attendance!
                After each session is over, we will add links to any resources or discussions
                from that session.
              </p>
              <h2>Upcoming sessions</h2>
              { this.renderSessionsList(this.state.upcomingSessions) }
              <h2>Past sessions</h2>
              { this.renderSessionsList(this.state.pastSessions) }
            </div>
          </div>
        </section>
      </Layout>
    );
  }
};
