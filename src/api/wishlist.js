import service from './service'

function submit(url, data) {
    return service({
        url,
        method: 'POST',
        data
    })
}
function getWishlists(url) {
    return service({
        url,
        method: 'GET',
    })
}

function getWishlist(url) {
    return service({
        url,
        method: 'GET',
    })
}

function deleteWishList(url, data) {
    return service({
        url,
        method: 'DELETE',
        data
    })
}

function updateWishlist(url, data) {
    return service({
        url,
        method: 'PATCH',
        data
    })
}
 
export {
    submit,
    getWishlists,
    deleteWishList,
    getWishlist,
    updateWishlist
}