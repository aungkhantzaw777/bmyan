import { useEffect, useState } from "react"
import { getWishlists } from "../api/wishlist"

function CreateExpanse() {
    const [wishlists, setWishlists] = useState([])
    const [paginationInfo, setPaginationInfo] = useState()
    
    useEffect(() => {
        getWishlists('wishlist').then(({data}) => {
            const {data: d, ...paginate} = data
            setWishlists(d)
            setPaginationInfo(paginate)
        })
    }, [])
    return (
        <>
        <div className="form-wrap">
            <select name="" id="">
                {wishlists.map(v => {
                    return (
                        <option key={v.id} value={v.id}>{ v.name } | {v.price}</option>
                    )
                })}
            </select>
        </div>
        </>
    )
}

export default CreateExpanse