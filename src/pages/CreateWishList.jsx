import { useEffect, useState } from 'react';
import { Button, Form, Table, Pagination } from 'react-bootstrap';
import { getWishlist, submit as send } from '../api/wishlist'

function CreateWishList() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [wishlists, setWishlists] = useState([])
    const [paginationInfo, setPaginationInfo] = useState(null)

    const submit = async (e) => {
        e.preventDefault();
        send('wishlist/create', { name, price }).then(({ data }) => {

            setWishlists(prev => {
                return [...prev, data]
            })
            window.location = '/wishlist/create'
        }).catch(e => {
            console.log(e.message)
        })
    }
    const handleName = (e) => {
        setName(e.target.value)
    }
    const handlePrice = (e) => {
        setPrice(e.target.value)
    }

    useEffect(() => {
        getWishlist('wishlist').then(({ data }) => {
            let { data: d, ...paginate } = data
            console.log(paginate)
            setWishlists(d)
            setPaginationInfo(paginate)
        }).catch(e => {
            console.log(e.message)
        })
    }, [])

    var paginatinItems = () => {
        if (!paginationInfo) {
            return []
        }
        let items = []

        for (let number = 1; number <= paginationInfo.last_page; number++) {
            items.push(
                <Pagination.Item key={number} active={number === 1}>
                    {number}
                </Pagination.Item>,
            )
        }
        return (
            <>
                {items}
            </>
        )
    }


    return (
        <>
            <div className="form-wrap mt-3">
                <Form onSubmit={submit}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>name</Form.Label>
                        <Form.Control onChange={handleName} value={name} type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>price</Form.Label>
                        <Form.Control onChange={handlePrice} value={price} type="text" />
                    </Form.Group>
                    <div className='d-flex justify-content-end mt-3'>
                        <Button type="submit">Save</Button>
                    </div>
                </Form>

                <Table className='mt-3' striped>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            wishlists.map(w => (
                                <tr key={w.id}>
                                    <td>{w.name}</td>
                                    <td>{w.price}</td>
                                </tr>
                            ))
                        }

                    </tbody>
                </Table>

                {
                    paginationInfo && (

                        <Pagination>
                            <Pagination.First />
                            <Pagination.Prev />

                            {
                                paginatinItems()
                            }
                            
                            <Pagination.Next />
                            <Pagination.Last />
                        </Pagination>
                    )
                }
            </div>
        </>
    )
}

export default CreateWishList