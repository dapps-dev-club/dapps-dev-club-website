import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../../components/Layout';
import Calendar from 'tt-react-calendar';
import dateFormat from 'date-fns/format';
import dateParseIso from 'date-fns/parseISO';
import QrCode from '../../components/QrCode';

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
                Each session will link to an external site (meetup.com or eventbrite),
                where we would like you
                to RSVP in order for the organisers to plan for numbers in attendance!
                After each session is over, we will add links to any resources or discussions
                from that session.
              </p>

              <p>
                Jump to:&nbsp;
                <a href="#calendar">Calendar</a>&nbsp;|&nbsp;
                <a href="#upcoming">Upcoming sessions</a>&nbsp;|&nbsp;
                <a href="#past">Past sessions</a>
              </p>

              <h2 id="upcoming" name="upcoming">Upcoming sessions</h2>
              { renderSessionsList(upcomingSessions) }

              <h2 id="past" name="past">Past sessions</h2>
              { renderSessionsList(pastSessions) }

              <h2 id="calendar" name="calendar">Calendar</h2>
              { renderCalendar(calendarTimeZone, upcomingSessions, pastSessions) }

              <QrCode
                url="https://dappsdev.org/sessions/"
                logoUrl="https://dappsdev.org/img/dadc-logo.png"
              ></QrCode>
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
      const sessionTime = dateParseIso(session.time.start);
      const displayTime = dateFormat(
        sessionTime,
        'EEEE, do MMMM yyyy, h:mm a',
        {
          weekStartsOn: 1,
          awareOfUnicodeTokens: true,
        },
      );
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

    const firstUpcomingSession = upcomingSessions[0];
    if (firstUpcomingSession) {
      firstUpcomingSession.isNext = true;
    }

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

function renderLinksList(links) {
  if (!Array.isArray(links) || links.length < 1) {
    return null;
  }

  return (
    <div className="linksList">
      <p>Read more: </p>
      <ul>
        {links.map((link, index) => {
          return (<li key={index}>
            <p>
              <a href={link.url}>{link.text}</a>
            </p>
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
        className="button is-large rsvp"
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

  return (<div
      key={session.id}
      className="session"
    >
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
    { renderLinksList(session.links) }
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
  return dateFormat(
    date,
    'yyyy-MM-dd',
    {
      weekStartsOn: 1,
      awareOfUnicodeTokens: true,
    },
  );
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
    const className = session.isNext ? 'day hasEvent nextEvent' : 'day hasEvent';
    return (
      <div
        id={anchor}
        name={anchor}
        className={className}
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
    const start = dateParseIso(session.time.start);
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
      lastRenderedDay="2019/08/31"
      monthClassName="tt-cal-month"
      monthHeaderFormat="MMM YYYY"
      monthHeaderClassName="tt-cal-month-header"
      renderDay={renderCalendarDay.bind(undefined, timeZone, sessionsMap)}
      renderMonthHeader={renderCalendarMonthHeader}
      weekClassName="tt-cal-week"
    />
  );
}
