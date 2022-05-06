export default function splitTimestamp(timestamp: string) {
  const datetime = timestamp.split('T');
  const date = datetime[0];
  const timeFull = datetime[1];

  const hhmmss = timeFull.split('+')[0];
  const _partials = hhmmss.split(':');

  const hours = _partials[0];
  const minutes = _partials[1];
  const seconds = _partials[2];

  const hhmm = `${hours}:${minutes}`;

  return { date, timeFull, hhmmss, hhmm, hours, minutes, seconds };
}
