import { Routes, Route } from "react-router-dom";

import "./App.css"
import Navbar from "./component/extrapages/Navbar";
import Footer from "./component/extrapages/Footer"


import Home from "./component/pages/Home";
import Cart from "./component/pages/Cart";
import Login from "./component/pages/Login";
import Signup from "./component/pages/Signup";
import Myprofile from "./component/profile/myprofile";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Myprofile />} />
      </Routes>
    <Footer/>
    </>
  );
}

export default App;