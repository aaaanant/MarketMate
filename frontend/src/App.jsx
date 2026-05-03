import { Routes, Route, useLocation } from "react-router-dom";

import "./App.css";
import Navbar from "./component/extrapages/Navbar";
import Footer from "./component/extrapages/Footer";

import Home from "./component/pages/Home";
import ProductPage from "./component/pages/Productpage";


import Cart from "./component/pages/Cart";
import Login from "./component/pages/Login";
import Signup from "./component/pages/Signup";
import Myprofile from "./component/profile/myprofile";
import Store from "./component/extrapages/Store";
import Paymentgateway from "./component/pages/Paymentgateway";
import Shopdashboard from "./component/pages/Shopdashboard";
import Allproduct from "./component/extrapages/Allproduct";
function App() {
  const location = useLocation();

  const role = localStorage.getItem("role");
  const isDashboard = role === "shopkeeper";

  return (
    <>
      <Navbar isDashboard={isDashboard} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Myprofile />} />
        <Route path="/store" element={<Store />} />
        <Route path="/payment" element={<Paymentgateway />} />
        <Route path="/shopdashboard" element={<Shopdashboard />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/allproduct" element={<Allproduct />} />
      </Routes>

      <Footer isDashboard={isDashboard} />
    </>
  );
}

export default App;