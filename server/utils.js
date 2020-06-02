const libqqwry = require('lib-qqwry')
const qqwry = libqqwry() //初始化IP库解析器
qqwry.speed() //启用急速模式

function ipToCity(ip) {
    const result = qqwry.searchIP(ip)
    return result.Area + ' ' + result.Country
}

//获取客户端ip地址
function getClientIp(req) {
    let ip = req.headers['x-forwarded-for']
             || req.ip
             || req.connection.remoteAddress
             || req.socket.remoteAddress
             || req.connection.socket.remoteAddress
             || ''
    
    if (ip.split(',').length > 0) {
        ip = ip.split(',')[0]
    }

    ip = ip.substr(ip.lastIndexOf(':') + 1, ip.length)                        
    return ip
} 

function formatIP(ip='') {
    return ip? ip.split('.').slice(0, 3).join('.')+'.*':''
}

module.exports = {
    getClientIp,
    ipToCity,
    formatIP
}