import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../../components/Layout';
import Calendar from 'tt-react-calendar';

import sessionData from './session-data.json';

export default class Sessions extends React.Component {
  constructor(props) {
    super(props);

    const {
      upcomingSessions,
      pastSessions,
    } = preprocessSessions(sessionData);

    this.state = {
      upcomingSessions,
      pastSessions,
      calendarTimeZone: sessionData.calendarTimeZone,
    };
  }

  render() {
    const {
      upcomingSessions,
      pastSessions,
      calendarTimeZone,
    } = this.state;

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
              <h1 id="session" name="session">Sessions</h1>
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
              <h2 id="calendar" name="calendar">Calendar</h2>
              { renderCalendar(calendarTimeZone, upcomingSessions, pastSessions) }
              <h2 id="upcoming" name="upcoming">Upcoming sessions</h2>
              { renderSessionsList(upcomingSessions) }
              <h2 id="past" name="past">Past sessions</h2>
              { renderSessionsList(pastSessions) }
            </div>
          </div>
        </section>
      </Layout>
    );
  }
};

function preprocessSessions(sessionData) {
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

    return  {
      upcomingSessions,
      pastSessions,
    };
}

function getSessionAnchor(session) {
  return `session-${session.id}`;
}

function getCalendarAnchor(session) {
  return `calendar-${session.id}`;
}

function renderTopicsList(topics) {
  if (!Array.isArray(topics) || topics.length < 1) {
    return (
      <div className="topicsList">
        <p>Topics: (none)</p>
      </div>
    );
  }

  return (
    <div className="topicsList">
      <p>Topics: </p>
      <ul>
        {topics.map((topic) => {
          return (<li key={topic.id}>
            <p>{topic.name}</p>
          </li>);
        })}
      </ul>
    </div>
  );
}

function renderRsvp(session) {
  if (!session.rsvp || !session.rsvp.url) {
    return (
      <p>
        <span>Registration not yet available</span>
      </p>
    );
  }

  return (
    <p>
      <a
        className="button is-large"
        href={session.rsvp.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <strong>{session.rsvp.name}</strong>
      </a>
    </p>
  );
}

function renderSession(session) {
  const timeNotConfirmedEl = !session.time.confirmed ?
    (
      <span>&nbsp;&mdash; to be confirmed</span>
    ) :
    null;


  // Link "back" to the anchor of the corresponding day within the calendar
  const anchor = getSessionAnchor(session);
  const href = `#${getCalendarAnchor(session)}`;

  return (<div key={session.id}>
    <h3 id={anchor} name={anchor}>
      {session.name}
    </h3>
    <p>
      <span>Location: </span>
      <span>{session.location.name}</span>
    </p>
    <p>
      <span>Time: </span>
      <span>{session.time.name}</span>
      {timeNotConfirmedEl}
    </p>
    { renderTopicsList(session.topics) }
    { renderRsvp(session) }
    <p>
      <a href={href}>
        &laquo; back to calendar
      </a>
    </p>
    <p></p>
  </div>);
}

function renderSessionsList(sessions) {
  if (!Array.isArray(sessions) || sessions.length < 1) {
    return (
      <p>
        (none)
      </p>
    );
  }
  return (
    <div className="sessionsList">
      { sessions.map(renderSession) }
    </div>
  );
}

function getCalendarSessionMapKey(date, timeZone) {
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone,
  });
}

function renderCalendarDay(timeZone, sessionsMap, day) {
  const text = day.format('DD');
  const key = getCalendarSessionMapKey(day.toDate());
  const session = sessionsMap.get(key);
  if (!session) {
    return (
      <div className="day">
        {text}
      </div>
    );
  } else {
    // When an event is on this day, highlight and hyperlink
    const href = `#${getSessionAnchor(session)}`;
    const anchor = getCalendarAnchor(session);
    return (
      <div
        id={anchor}
        name={anchor}
        className="day hasEvent"
      >
        <a href={href}>
          {text}
        </a>
      </div>
    );
  }
}

function renderCalendarMonthHeader(firstDay, format) {
  const text = firstDay.format(format);
  return (
    <span className="monthHeader">
      {text}
    </span>
  );
}

function renderCalendar(timeZone, upcomingSessions, pastSessions) {
  const allSessions = [...upcomingSessions, ...pastSessions];
  const sessionsMap = new Map();
  allSessions.forEach((session) => {
    const start = new Date(session.time.start);
    const key = getCalendarSessionMapKey(start, session.time.tz);
    sessionsMap.set(key, session);
  });

  return (
    <Calendar
      className="calendar-container"
      compactMonths={false}
      dayAbbrevs={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
      dayHeaderClassName="tt-cal-day-header"
      dayHeaderStyle={Calendar.DayHeaderStyles.InFirstMonth}
      firstRenderedDay="2019/02/01"
      lastRenderedDay="2019/07/31"
      monthClassName="tt-cal-month"
      monthHeaderFormat="MMM YYYY"
      monthHeaderClassName="tt-cal-month-header"
      renderDay={renderCalendarDay.bind(undefined, timeZone, sessionsMap)}
      renderMonthHeader={renderCalendarMonthHeader}
      weekClassName="tt-cal-week"
    />
  );
}
