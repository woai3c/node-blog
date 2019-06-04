export function timestampToDate(timestamp) {
    let date = new Date(timestamp)
    return date.toLocaleDateString().replace(/\//g, '-') + ' ' + date.toTimeString().split(' ')[0]
}

export function objToUrlParam(obj) {
    let param = ''
    for (let key in obj) {
        param += '&' + key + '=' + obj[key]
    }
    
    return '?' + param.substr(1)
}