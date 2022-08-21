import { useEffect, useState } from 'react';
import { Button, Form, Table,  } from 'react-bootstrap';
import { getWishlists, submit as send, deleteWishList } from '../api/wishlist'
import Pagination from "react-js-pagination";
import CustomModal from '../components/CustomModal';
import { useNavigate } from 'react-router-dom';


function CreateWishList() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [wishlists, setWishlists] = useState([])
    const [paginationInfo, setPaginationInfo] = useState(null)
    const [nameValid, setNameValid] = useState(false)
    const [priceValid, setPriceValid] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const [editShow, setEditShow] = useState(false)
    const [deleteShow, setDeleteShow] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const navigate = useNavigate()

    const submit = async (e) => {
        e.preventDefault();
        setIsSubmit(true)


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

    const fetchPage = (page) => {
        getWishlists(`wishlist?page=${page}`).then(({ data }) => {
            let { data: d, ...paginate } = data
            setWishlists(d)
            setPaginationInfo(paginate)
        }).catch(e => {
            console.log(e.message)
        })
    }

    useEffect(() => {
        getWishlists('wishlist').then(({ data }) => {
            let { data: d, ...paginate } = data
            setWishlists(d)
            setPaginationInfo(paginate)
        }).catch(e => {
            console.log(e.message)
        })
    }, [])

    const handleDelete = (id) => {
        setDeleteId(id)
        setDeleteShow(true)
    }
    const deleteAction = async (id) => {
        await deleteWishList(`wishlist/delete/${id}`,{id})
        setDeleteShow(false)
        setDeleteId('')
        window.location = '/wishlist/create'
    }

    const navigateEdit = (id) => {
        navigate(`/wishlist/edit/${id}`, {replace: true})
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            wishlists.map(w => (
                                <tr key={w.id}>
                                    <td>{w.name}</td>
                                    <td>{w.price}</td>
                                    <td>
                                        <a onClick={() => navigateEdit(w.id)} href="#">Edit</a>
                                        |
                                        <a className='text-red' onClick={() => handleDelete(w.id)} href="#">Delete</a>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>

                <Pagination
                    activePage={paginationInfo?.current_page ? paginationInfo?.current_page : 0}
                    itemsCountPerPage={paginationInfo?.per_page ? paginationInfo?.per_page : 0}
                    totalItemsCount={paginationInfo?.total ? paginationInfo?.total : 0}
                    onChange={(pageNumber) => {
                        fetchPage(pageNumber)
                    }}
                    pageRangeDisplayed={8}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="<<"
                    lastPageText=">>"
                />
                {/* <Button onClick={() => setEditShow(true)}>modal</Button> */}

                <CustomModal
                show={deleteShow}
                headerText='Are you sure you wanna delete'
                bodyText={`This action going to delete permanetly!${deleteId}`}
                hide={() => setDeleteShow(false)}
                actionElement={(
                    <>
                    <Button onClick={() => setDeleteShow(false)}  variant="secondary">cancel</Button>
                    <Button onClick={() => deleteAction(deleteId)} variant="danger">Delete</Button>
                    </>
                )}
                />

            </div>
        </>
    )
}

export default CreateWishList