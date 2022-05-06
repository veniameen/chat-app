export default function splitTimestamp(timestamp) {
    var datetime = timestamp.split('T');
    var date = datetime[0];
    var timeFull = datetime[1];
    var hhmmss = timeFull.split('+')[0];
    var _partials = hhmmss.split(':');
    var hours = _partials[0];
    var minutes = _partials[1];
    var seconds = _partials[2];
    var hhmm = "".concat(hours, ":").concat(minutes);
    return { date: date, timeFull: timeFull, hhmmss: hhmmss, hhmm: hhmm, hours: hours, minutes: minutes, seconds: seconds };
}
