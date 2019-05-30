const fs = require('fs');
const path = require('path');

const ics = require('ics');

const sessionData = require('../src/pages/sessions/session-data.json');

console.log('Generating calendar...');
const icsInput = transformSessionDataToIcsFormat(sessionData);
outputIcalFile(icsInput);

function transformSessionDataToIcsFormat(input) {
  const {
    calendarTimeZone,
    sessions,
    locations,
  } = input;

  const locationMap = new Map();
  locations.forEach((location) => {
    const { id } = location;
    locationMap.set(id, {
      ...location,
    });
  });

  const output = sessions
    .filter((session) => {
      return session.time && session.time.confirmed;
    })
    .map((session) => {
      const title = session.name;
      const id = session.id;
      const uid = `${id}@sessions@DAppsDevClub@dappsdev.org`;
      const description = 'DApps Dev Club session.';
      const url = `https://dappsdev.org/sessions#session-${id}`;
      const startDate = new Date(session.time.start);
      const start = [
        startDate.getUTCFullYear(),
        startDate.getUTCMonth() + 1,
        startDate.getUTCDate(),
        startDate.getUTCHours(),
        startDate.getUTCMinutes(),
      ];
      const duration = {
        hours: 3,
        minutes: 0,
      };
      const locationObject = locationMap.get(session.location.id);
      const location = `${locationObject.name}, ${locationObject.address}`;
      const geo = locationObject.geo;

      return {
        uid,
        start,
        duration,
        title,
        description,
        location,
        url,
        geo,
      };
    });

  return output;
}

function outputIcalFile(input) {
  const {
    error,
    value,
  } = ics.createEvents(input);

  if (error) {
    console.error('... failed to generate iCal');
    throw error;
  }

  console.log(value);

  const calendarFilePath = path.resolve(__dirname, '../static/sessions/calendar.ical');
  console.log(`Calendar will be written to file: ${calendarFilePath}`);

  fs.writeFile(calendarFilePath, value, (fileError) => {
    if (fileError) {
      console.error('... failed to write to file.');
      throw fileError;
    }

    console.log('... completed writing calendar file!');
  });
}
