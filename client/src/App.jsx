import { useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import About from "./components/Admin/About";
import AdminWrapper from "./components/Admin/AdminWrapper";
import Settings from "./components/Admin/Settings";
import CheckoutPage from "./components/Checkout/CheckoutPage";
import LoginPage from "./components/LoginPage";
import Products from "./components/Products";
import Register from "./components/Register";
import Seller from "./components/Seller";
import ItemsAddPage from "./components/Sellers/ItemsAddPage";
import Home from "./pages/Home";
import AdminProducts from "./components/Admin/AdminPages/Products/AdminProducts";
import UserPage from "./components/Admin/AdminPages/Users/UserPage";
import CartPage from "./components/CartPage/CartPage";


const App = () => {
  useEffect(() => {
    const importTE = async () => {
      await import("tw-elements");
    };
    importTE();
  }, []);
  return (

    <Routes>
      <Route path="" element={<Home />} />
      <Route path="product" element={<Products />} />
      <Route path="product/checkout" element={<CartPage />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="seller" element={<Seller />} />
      <Route path="seller/add" element={<ItemsAddPage />} />
      <Route path="settings" element={<Settings />} />
      <Route path="about" element={<About />} />

      <Route path="admin" element={<LayoutsWithNavbar />}>
        <Route path="products" element={<AdminProducts />} />
        <Route path="users" element={<UserPage />} />
      </Route>

    </Routes>

  )

  function LayoutsWithNavbar() {
    return (
      <>
        {/* Your navbar component */}
        <AdminWrapper >

          {/* This Outlet is the place in which react-router will render your components that you need with the navbar */}
          <Outlet />
        </AdminWrapper>
        {/* You can add a footer to get fancy in here :) */}
      </>
    );
  }
};
export default App;