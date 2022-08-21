import { useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { getWishlist, updateWishlist } from '../api/wishlist'


function EditWishlist() {
    const { id } = useParams()
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    useEffect(() => {
        getWishlist(`wishlist/show/${id}`).then(({ data }) => {
            let { name: _name, price: _price } = data
            setName(_name)
            setPrice(_price)
        }).catch(e => {
            console.log(e.message)
        })
    }, [])

    const submit = async (e) => {
        e.preventDefault();

        await updateWishlist(`wishlist/update/${id}`, {name, price}).then((r) => {
            console.log(r)
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
    return (
        <>
            <div className="form-wrap">
                <Form onSubmit={submit}>
                    <Form.Group>
                        <Form.Label >name</Form.Label>
                        <Form.Control value={name} onChange={handleName} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label >price</Form.Label>
                        <Form.Control value={price} onChange={handlePrice} />
                    </Form.Group>
                    <div className='mt-3 d-flex justify-content-end'>
                        <Button type='submit'>Edit</Button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default EditWishlist