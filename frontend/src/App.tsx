import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.tsx";
// import Category from "./components/category/Category.tsx";
// import Slider from "./components/slider/Slider.tsx";
// import Top from "./components/top/Top.tsx";
import Footer from "./components/Footer/Footer.tsx";
import Login from "./components/Login/Login.tsx";
import About from "./pages/About/About.tsx";
import ProductList from "./pages/PoductList/ProductList.tsx";
import ProductBrandList from "./pages/PoductList/ProductBrandList .tsx";
import ProductListCard from "./components/ProListCard/ProductListCard.tsx";
import SignUp from "./pages/SignUp/SignUp.tsx";
import Contact from "./pages/Contact/Contact.tsx";
// import List from "./utils/List.tsx";
// import CategoryPop from "./utils/CategoryPop.tsx";
import ProductDetails from "./pages/ProductDetails/ProductDetails.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import Cart from "./pages/cart/Cart.tsx";
import Orders from "./pages/Orders/Orders.tsx";
import Home from "./pages/Home/Home.tsx";
import Checkout from "./pages/Checkout/Checkout.tsx";
/**
 * Here all routing present
 * @returns 
 */
const App:React.FC = () => {
  return (
    <Router>
      <div className="app__container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="products"
            element={<ProductList childNod={<ProductListCard />} />}
          />
          <Route
            path="/products/product-details"
            element={<ProductDetails />}
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/brand" element={<ProductBrandList />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
