
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home"
import CreateIncome from "./pages/CreateIncome"
import CreateWishList from "./pages/CreateWishList";
import WishList from "./pages/WishList";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/income" element={<CreateIncome />} />
      <Route path="/wishlist/create" element={<CreateWishList />} />
      <Route path="/wishlist" element={<WishList />} />
    </Routes>
  );
}

export default App;
