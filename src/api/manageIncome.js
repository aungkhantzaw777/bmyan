import service from './service'

function submit(url, data) {
    return service({
        url,
        method: 'POST',
        data
    })
}

function initialize(url) {
    return service({
        url,
        method: 'GET'
    })
}

 
export {
    submit,
    initialize
}