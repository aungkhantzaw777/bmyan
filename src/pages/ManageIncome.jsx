import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { initialize } from '../api/manageIncome'

function ManageIncome() {
    const [items, setItems] = useState([])

    useEffect(() => {
        initialize('manageIncome').then(({ data }) => {
            console.log(data)
            setItems(data)
        }).catch(e => {
            console.log(e.message)
        })
    }, [])


    const nav = useNavigate()

    function DateComponent ({ incomes }) {
        return (
            <td>
                {incomes.map(income => (
                    <span key={income.id}>{income.pivot.date}</span>
                ))}
            </td>
        )
    }

    return (
        <>
            <div className="form-wrap">
                <Button onClick={() => nav('/createExpanse')}>New Expanse</Button>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>price</th>
                            <th>date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map(item => (
                                <tr key={item.id}>
                                    <td >{item.name}</td>
                                    <td >{item.price}</td>
                                    <DateComponent incomes={item.incomes} />
                                </tr>
                            ))
                        }
                    </tbody>

                </Table>
            </div>
        </>
    )
}

export default ManageIncome