const moment = require('moment-timezone');

exports.date_getDay = (date) => {
    let delimiter = null;
    let day;

    if (date) {
        if (date.includes('-')) {
            delimiter = '-';
        } else if (date.includes('/')) {
            delimiter = '/';
        }

        if (delimiter) {
            // Regex to match yyyy-mm-dd or yyyy/mm/dd
            const datePattern = new RegExp(`^(\\d{4})${delimiter}(\\d{2})${delimiter}(\\d{2})$`);
            const match = date.match(datePattern);

            if (match) {
                day = match[3];
            } else {
                return 'Invalid date format';
            }
        } else {
            return 'Invalid date format';
        }
    } else {
        const currentDate = new Date();
        day = String(currentDate.getDate()).padStart(2, '0');
    }

    return day;
}

exports.date_getMonth = (format = 'number', date) => {
    let delimiter = null;
    let month;

    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

    if (date) {
        if (date.includes('-')) {
            delimiter = '-';
        } else if (date.includes('/')) {
            delimiter = '/';
        }

        if (delimiter) {
            // Regex to match yyyy-mm-dd or yyyy/mm/dd
            const datePattern = new RegExp(`^(\\d{4})${delimiter}(\\d{2})${delimiter}(\\d{2})$`);
            const match = date.match(datePattern);

            if (match) {
                month = parseInt(match[2]);
            } else {
                return 'Invalid date format';
            }
        } else {
            return 'Invalid date format';
        }
    } else {
        const currentDate = new Date();
        month = currentDate.getMonth() + 1; // Months are zero-indexed in JS
    }

    if (format === 'string') {
        return monthNames[month - 1];
    } else {
        return String(month).padStart(2, '0'); // Return month as a zero-padded number
    }
}

exports.date_getYear = (date) => {
    let delimiter = null;
    let year;

    if (date) {
        if (date.includes('-')) {
            delimiter = '-';
        } else if (date.includes('/')) {
            delimiter = '/';
        }

        if (delimiter) {
            // Regex to match yyyy-mm-dd or yyyy/mm/dd
            const datePattern = new RegExp(`^(\\d{4})${delimiter}(\\d{2})${delimiter}(\\d{2})$`);
            const match = date.match(datePattern);

            if (match) {
                year = match[1];
            } else {
                return 'Invalid date format';
            }
        } else {
            return 'Invalid date format';
        }
    } else {
        const currentDate = new Date();
        year = String(currentDate.getFullYear());
    }

    return year;
}


exports.date_getTime = (type) => {
    const currentDate = new Date();
    const options = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };

    const formatter = new Intl.DateTimeFormat('id-ID', options);
    const parts = formatter.formatToParts(currentDate);

    let time;
    if (type === 'hour') {
        time = parts.find(part => part.type === 'hour').value;
    } else if (type === 'minutes') {
        time = parts.find(part => part.type === 'minute').value;
    } else {
        const hour = parts.find(part => part.type === 'hour').value;
        const minute = parts.find(part => part.type === 'minute').value;
        time = `${hour}:${minute}`;
    }

    return time;
}

exports.date_toFormat = (date) => {
    const [year, day, month] = date.split('-')

    return `${day}/${month}/${year}`
}

exports.date_toInputHtml = (date) => {
    const [day, month, year] = date.split('/')

    return `${year}-${day}-${month}`
}

exports.date_integerToDate = (dateInteger) => {
    const datevalue = new Date((dateInteger - 25569) * 86400 * 1000)

    const day = String(datevalue.getDate()).padStart(2, '0');
    const month = String(datevalue.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = datevalue.getFullYear();

    return `${year}-${month}-${day}`
}

exports.date_getFullDate = () => {
    const day = this.date_getDay()
    const month = this.date_getMonth()
    const year = this.date_getYear()

    return `${year}-${month}-${day}`
}

exports.date_getFirstDayOfMonth = (date) => {
    const currentDate = date ? new Date(date) : new Date();
    
    const targetYear = currentDate.getFullYear();
    const targetMonth = currentDate.getMonth();

    const firstDay = new Date(targetYear, targetMonth, 1);

    const formatDate = (date) => date.toISOString().split('T')[0];
    return formatDate(firstDay); 
}

exports.date_getLastDayOfMonth = (date) => {
    const currentDate = date ? new Date(date) : new Date();
    
    const targetYear = currentDate.getFullYear();
    const targetMonth = currentDate.getMonth();

    const lastDay = new Date(targetYear, targetMonth + 1, 0);

    const formatDate = (date) => date.toISOString().split('T')[0];
    return formatDate(lastDay);
};

exports.date_getMonthRange = () => {
    // Get the current date in WIB (Waktu Indonesia Barat)
    const currentDate = moment().tz('Asia/Jakarta');

    // Start date: the 1st day of the current month in WIB
    const startDate = currentDate.clone().startOf('month');

    // End date: the last day of the current month in WIB
    const endDate = currentDate.clone().endOf('month');

    // Convert dates to yyyy-mm-dd format
    const formatDate = (date) => date.format('YYYY-MM-DD');

    return {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate)
    };
}