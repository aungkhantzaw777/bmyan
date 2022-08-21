import './Home.css'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <>
            <div className="d-flex w-full justify-content-around mt-3">
                <Link to={`/income`} className="menu">
                    Income
                </Link>
                <Link to={`/mangaeIncome`} className="menu">
                  Mange Income
                </Link>
                <Link to={`/wishlist/create`} className="menu">
                    Wishlist
                </Link>
            </div>
        </>
    )
}

export default Home