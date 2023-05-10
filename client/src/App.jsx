import React from "react";
import GlobalStyles from "./Globalstyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StoreList from "./Pages/StoreList";
import AddStore from "./Pages/AddStore";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import Login from "./Pages/login";
import Signup from "./Pages/signup";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<StoreList />} />
          <Route path="/add" element={<AddStore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
