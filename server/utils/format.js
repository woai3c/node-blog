function formatDate(time) {
    const date = new Date(time)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.toTimeString().split(' ')[0]
}

function formatLog(data, date, duration) {
    return {
        duration,
        time: formatDate(date),
        hostname: data.hostname,
        method: data.method,
        url: data.url,
        headers: data.headers
    }
}

module.exports = {
    formatLog
}