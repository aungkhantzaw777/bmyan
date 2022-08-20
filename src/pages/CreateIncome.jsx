import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { url } from '../config/baseURL'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function CreateIncome() {
    const [amount, setAmount] = useState('')
    const [enterAmountIsValid, setEnterAmountIsValid] = useState(false)

    const navigate = useNavigate()

    const submit = async (e) => {
        e.preventDefault();

        if(amount.trim() === '') {
            setEnterAmountIsValid(true)
            return 
        }else {
            alert('not error')
            setEnterAmountIsValid(false)
        }

        // validate 
        axios.post(`${url}/api/incomes/create`, { amount }).then(r => {
            console.log(r.data)
           navigate("/", { replace: true})
           setAmount('')
        }).catch(e => {
            console.log(e)
        })
    }
    function handleInput(event) {
        setAmount(parseInt(event.target.value));
    }

    return (
        <>
            <div className="form-wrap">
                <Form onSubmit={submit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Enter Monthly Income amount</Form.Label>
                        <Form.Control onChange={handleInput} value={amount} type="text" />
                        {enterAmountIsValid && 
                            (
                                <p className='text-red'>Please Enter Input</p>
                            )
                        }
                        <div className='d-flex justify-content-end mt-3'>
                            <Button type="submit">Save</Button>
                        </div>
                    </Form.Group>
                </Form>
            </div>
        </>
    )
}

export default CreateIncome