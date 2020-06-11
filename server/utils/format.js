function formatDate(time) {
    const date = new Date(time)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.toTimeString().split(' ')[0]
}

function serialize(req) {
    return {
        hostname: req.hostname,
        method: req.method,
        url: req.url,
        headers: req.headers,
        time: formatDate(new Date())
    }
}

module.exports = {
    serialize
}