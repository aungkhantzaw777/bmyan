import service from './service'

function submit(url, data) {
    return service({
        url,
        method: 'POST',
        data
    })
}

 
export {
    submit,
    
}