import service from './service'

function submit(url, data) {
    return service({
        url,
        method: 'POST',
        data
    })
}
function getWishlist(url) {
    return service({
        url,
        method: 'GET',
    })
}

export {
    submit,
    getWishlist
}