import moment from "moment";
import 'moment/locale/vi'
moment.locale('vi')

export function formatMDY(timestamp) {
    return timestamp ? formatDatetime(timestamp, "MM/DD/YYYY") : ""
}

export function formatDMY(timestamp) {
    return timestamp ? formatDatetime(timestamp, "DD/MM/YYYY") : ""
}

export function formatYMD(timestamp) {
    return timestamp ? formatDatetime(timestamp, "YYYY-MM-DD") : ""
}

export function formatHMDMY(timestamp) {
    return timestamp ? formatDatetime(timestamp, "HH:mm DD/MM/YYYY") : ""
}

export function formatHM(timestamp) {
    return timestamp ? formatDatetime(timestamp, "HH:mm") : ""
}

export function formatHMS(timestamp) {
    return timestamp ? formatDatetime(timestamp, "HH:mm:ss") : ""
}

export function formatDatetime(timestamp, format = "L") {
    return Number.isNaN(timestamp) ? moment(timestamp * 1000).format(format) : moment(timestamp).format(format);
}

export function formatFullWeekday(timestamp) {
    switch (moment.locale()){
        case 'vi':
            return formatDatetime(timestamp, 'LLLL').slice(0, -5)
        case 'en':
            return formatDatetime(timestamp, 'LLLL').slice(0, -8)
        default:
            return formatDatetime(timestamp, 'LLLL');
    }
}

export function formatFormDate(timestamp) {
    if (!timestamp) return null;
    return formatDatetime(timestamp, "YYYY-MM-DD");
}

export function formatFormDatetime(timestamp) {
    if (!timestamp) return null;
    return formatDatetime(timestamp, "YYYY-MM-DDTHH:mm");
}

export function diffDays(start, end) {
    const startTime = moment(start * 1000);
    const endTime = moment(end * 1000);
    return endTime.diff(startTime, "days")
}

export function diffMinutes(start, end) {
    const startTime = moment(start * 1000);
    const endTime = moment(end * 1000);
    return endTime.diff(startTime, "minutes")
}

export function diffMinutesWithCurrentTime(start, suffix = '', lessThan, formatIfLessThan = 'HH:mm DD/MM/YYYY') {
    const startTime = moment(start * 1000);
    const endTime = moment();
    const minutes = endTime.diff(startTime, "minutes")
    if (lessThan && minutes >= lessThan) {
        return startTime.format(formatIfLessThan);
    }
    return minutes + suffix;
}

export function toTimestamp(strDate) {
    if (!(strDate)) return null;
    var datum = Date.parse(strDate);
    return datum / 1000;
}

export function timeToTimestamp(strTime) {
    if (!(strTime)) return null;
    var time = moment(strTime, "HH:mm:ss");
    return time.format("X");
}

export function relativeTime(start, lessThan, formatIfLessThan = 'HH:mm DD/MM/YYYY') {
    const startTime = moment(start * 1000);
    const endTime = moment();
    const minutes = endTime.diff(startTime, "minutes")
    if (lessThan && minutes >= lessThan) {
        return startTime.format(formatIfLessThan);
    }
    return startTime.fromNow();
}

export function toDate(timestamp) {
    return new Date(timestamp * 1000);
}

export function convertToTimeStamp(obj, fields) {
    if (!(obj)) return obj;
    fields.forEach(field => {
        obj[field] = toTimestamp(obj[field]);
    });
    return obj;
}

export function firstLastDayOfMonth(additionalRange = 0,format="") {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const thisMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    thisMonthStart.setDate(thisMonthStart.getDate() - additionalRange);
    thisMonthEnd.setDate(thisMonthEnd.getDate() + additionalRange);

    return {
        startDate: format ? moment(thisMonthStart).format(format) : thisMonthStart,
        endDate: format ? moment(thisMonthEnd).format(format) : thisMonthEnd
    }
}

export function timeStampNow() {
    return Date.now() / 1000;
}


export function formatTimestampToHumanTimeVi(timestamp) {
    const date = moment.unix(timestamp);
    return date.format('DD MMMM, YYYY','vi');
}

export function timeCal(time) {
    if (!time) return time;

    const now = new Date();
    const pastDate = new Date(time);
    const diffInSeconds = Math.abs((now - pastDate) / 1000);
    const diffInMinutes = diffInSeconds / 60;

    if (diffInMinutes < 60) {
        return Math.floor(diffInMinutes) + ' phút trước';
    }

    const diffInHours = diffInMinutes / 60;
    if (diffInHours < 24) {
        return Math.floor(diffInHours) + ' giờ trước';
    }

    const diffInDays = diffInHours / 24;
    if (diffInDays <= 30) {
        return Math.floor(diffInDays) + ' ngày trước';
    }

    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return pastDate.toLocaleDateString('vi-VN', options);
}
