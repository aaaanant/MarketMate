import { Routes, Route } from "react-router-dom";

import "./App.css"
import Navbar from "./component/extrapages/Navbar";
import Footer from "./component/extrapages/Footer"


import Home from "./component/pages/Home";
import Login from "./component/pages/Login";
import Signup from "./component/pages/Signup";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    <Footer/>
    </>
  );
}

export default App;