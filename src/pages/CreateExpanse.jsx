import { useEffect, useState } from "react"
import { getWishlists } from "../api/wishlist"
import { Button, Form, Table, } from 'react-bootstrap';
import { submit as send } from "../api/manageIncome";
import {useNavigate} from 'react-router-dom'

function CreateExpanse() {
    const [wishlists, setWishlists] = useState([])
    const [paginationInfo, setPaginationInfo] = useState()
    const [date, setDate] = useState()
    const [wishlist_id, setWishlist_id] = useState()
    const navigate = useNavigate()

    const submit = async (e) => {
        e.preventDefault();
        await send('manageIncome', { wishlist_id, date }).then(({data}) => {
            console.log(data)
            navigate('/')
        })
    }

    const handleWishlist = (e) => {
        setWishlist_id(e.target.value)
    }
    const handleDate = (e) => {
        setDate(e.target.value)
    }

    useEffect(() => {
        getWishlists('wishlist').then(({ data }) => {
            const { data: d, ...paginate } = data
            setWishlists(d)
            setPaginationInfo(paginate)
        })
    }, [])
    return (
        <>
            <div className="form-wrap mt-3">

                <Form onSubmit={submit}>
                    <Form.Group className="mb-3">
                        <Form.Label >Choose items from wishlist</Form.Label>
                        <Form.Select onChange={handleWishlist} aria-label="Default select example">
                            {wishlists.map(v => {
                                return (
                                    <option key={v.id} value={v.id}>{v.name} | {v.price}</option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label >Date</Form.Label>
                        <Form.Control onChange={handleDate} type="date" >

                        </Form.Control>
                        
                    </Form.Group>

                    <div className="mt-3"><Button type="submit">Save</Button></div>
                </Form>
            </div>
        </>
    )
}

export default CreateExpanse