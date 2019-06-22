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

module.exports = {
    getClientIp
}