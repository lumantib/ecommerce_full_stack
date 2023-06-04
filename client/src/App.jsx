import { Outlet, Route, Routes } from "react-router-dom";
import About from "./components/Admin/About";
import AdminViewAllProductsListPage from "./components/Admin/AdminPages/Products/AdminViewAllProducts/AdminViewAllProductsListPage";
import SellerProductListPage from "./components/Admin/AdminPages/Products/SellerProducts/SellerProductListPage";
import UserPage from "./components/Admin/AdminPages/Users/UserPage";
import AdminWrapper from "./components/Admin/AdminWrapper";
import Settings from "./components/Admin/Settings";
import CartPage from "./components/CartPage/CartPage";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products";
import Register from "./components/Register";
import Seller from "./components/Seller";
import ItemsAddPage from "./components/Sellers/ItemsAddPage";
import Home from "./pages/Home";


const App = () => {
  return (

    <Routes>
      <Route path="" element={<LayoutsWithDefaultNavbar />}>
        <Route path="" element={<Home />} />
        <Route path="product" element={<Products />} />
        <Route path="product/checkout" element={<CartPage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="seller" element={<Seller />} />
        <Route path="seller/add" element={<ItemsAddPage />} />
        <Route path="settings" element={<Settings />} />
        <Route path="about" element={<About />} />
      </Route>
      <Route path="dashboard" element={<LayoutsWithNavbar />}>
        <Route path="products/all" element={<AdminViewAllProductsListPage />} />
        <Route path="products/sell" element={<SellerProductListPage />} />
        <Route path="users" element={<UserPage />} />
      </Route>

    </Routes>

  )

  function LayoutsWithDefaultNavbar() {
    return (
      <>
        {/* Your navbar component */}
        <Navbar />
        {/* This Outlet is the place in which react-router will render your components that you need with the navbar */}
        <Outlet />
        {/* You can add a footer to get fancy in here :) */}
        <Footer />
      </>
    );
  }
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