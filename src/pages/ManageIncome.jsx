import { Button, Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

function ManageIncome() {

    const nav = useNavigate()
    return (
        <>
            <div className="form-wrap">
                <Button onClick={() => nav('/createExpanse')}>New Expanse</Button>
                <Table>
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>price</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                </Table>
            </div>
        </>
    )
}

export default ManageIncome