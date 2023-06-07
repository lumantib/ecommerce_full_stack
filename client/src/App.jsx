import { Outlet, Route, Routes } from "react-router-dom";
import About from "./components/Admin/About";
import AdminViewUsersListPage from "./components/Admin/AdminPages/AdminViewUsers/AdminViewUsersListPage";
import AdminViewCategoryListPage from "./components/Admin/AdminPages/Categories/AdminViewCategories/AdminViewCategoryListPage";
import AdminViewSeasonsListPage from "./components/Admin/AdminPages/Categories/AdminViewSeasons/AdminViewSeasonsListPage";
import AdminViewAllProductsListPage from "./components/Admin/AdminPages/Products/AdminViewAllProducts/AdminViewAllProductsListPage";
import AdminViewOrderListPage from "./components/Admin/AdminPages/Products/AdminViewOrder/AdminViewOrderListPage";
import SellerPendingVerifiedProductListPage from "./components/Admin/AdminPages/Products/PendingToBeVerifiedProducts/SellerPendingVerifiedProductListPage";
import SellerProductListPage from "./components/Admin/AdminPages/Products/SellerProducts/SellerProductListPage";
import SellerVerifiedProductListPage from "./components/Admin/AdminPages/Products/VerifiedProducts/SellerVerifiedProductListPage";
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
import ProductDescriptionPage from "./components/ProductDetailPage/ProductDescriptionPage";


const App = () => {
  return (

    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<Register />} />
      <Route path="" element={<LayoutsWithDefaultNavbar />}>
        <Route path="" element={<Home />} />
        <Route path="product" element={<Products />} />
        <Route path="product/view/:id" element={<ProductDescriptionPage />} />
        <Route path="product/checkout" element={<CartPage />} />
        <Route path="seller" element={<Seller />} />
        <Route path="seller/add" element={<ItemsAddPage />} />
        <Route path="settings" element={<Settings />} />
        <Route path="about" element={<About />} />
      </Route>
      <Route path="dashboard" element={<LayoutsWithNavbar />}>
        <Route path="products/all" element={<AdminViewAllProductsListPage />} />
        <Route path="products/sell" element={<SellerProductListPage />} />
        <Route path="products/sell-verified" element={<SellerVerifiedProductListPage />} />
        <Route path="products/pending" element={<SellerPendingVerifiedProductListPage />} />
        <Route path="products/orders" element={<AdminViewOrderListPage />} />
        <Route path="type/seasons" element={<AdminViewSeasonsListPage />} />
        <Route path="type/category" element={<AdminViewCategoryListPage />} />
        <Route path="users" element={<AdminViewUsersListPage />} />
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