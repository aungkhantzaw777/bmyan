import service from './service'

function send(url, data) {
    return service({
        url,
        method: 'POST',
        data
    })
}

export {
    send
}