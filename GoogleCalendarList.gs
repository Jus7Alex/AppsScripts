// Running this function will require authosation from a Google account.
// This function will return the next events from the Google account Calendar that authorised it.

function listNext10Events() {
  const calendarId = 'utminfo.id@gmail.com';
  const now = new Date();
  const events = Calendar.Events.list(calendarId, {
    timeMin: now.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
    maxResults: 10
  });
  if (!events.items || events.items.length === 0) {
    Logger.log('No events found.');
    return;
  }
  for (const event of events.items) {
    if (event.start.date) {
      // All-day event.
      const start = new Date(event.start.date);
      Logger.log('%s (%s)', event.summary, start.toLocaleDateString());
      return;
    }
    const start = new Date(event.start.dateTime);
    Logger.log('%s (%s)', event.summary, start.toLocaleString());
  }
}
