const bunyan = require('bunyan')
const log = bunyan.createLogger({
    name: 'node-blog',
    streams: [
        {
            level: 'info',
            path: './log/info.log'
        },
        {
            level: 'warn',
            path: './log/warn.log'
        },
        {
            level: 'error',
            path: './log/err.log'
        }
    ]
})

function handleError(err) {
    log.error(err)
    throw err
}

module.exports = {
    log,
    handleError
}