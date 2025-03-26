import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./components/Home/Home";
import AppContext from "./Context";
import ScrollToTop from "./ScrollToTop";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Error from "./components/Error/Error";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import AddProducts from "./components/AdminPanel/AddProducts";
import LoginAdmin from "./components/Login/LoginAdmin";
import Checkout from "./components/Checkout/Checkout";
import ViewAccount from "./components/ViewAccount/ViewAccount";
import AccountInfo from "./components/ViewAccount/AccountInfo";
import EditAccount from "./components/ViewAccount/EditAccount";
import PaymentPage from "./components/PaymentPage/PaymentPage";
import Category from "./components/Category/Category";
import CategoryPage from "./components/Home/CategoryPage/CategoryPage";
import ViewOrder from "./components/ViewAccount/ViewOrder";
import ManageOrder from "./components/AdminPanel/ManageOrder";
import ViewWishlist from "./components/ViewAccount/ViewWishlist";
import ManageUser from "./components/AdminPanel/ManageUser";
import ManageProduct from "./components/AdminPanel/ManageProduct";
import About from "./components/About/About";
import HomePage from "./components/Home/HomePage";

function App() {
    return (
        <BrowserRouter basename="/">
        {/* <BrowserRouter basename="/dustyzone"> */}
            <ScrollToTop/>
            <AppContext>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/home" element={<HomePage />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/admin" element={<LoginAdmin />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/checkout" element={<Checkout />}/>
                    <Route path="/product/:slug" element={<SingleProduct />}/>

                    <Route path="/admin-panel" element={<AdminPanel />}/>
                    <Route path="/admin-panel/view-orders" element={<ManageOrder />}/>
                    <Route path="/admin-panel/add-product" element={<AddProducts />}/>
                    <Route path="/admin-panel/manage-users" element={<ManageUser />}/>
                    <Route path="/admin-panel/manage-products" element={<ManageProduct />}/>

                    <Route path="/view-account" element={<ViewAccount />}/>
                    <Route path="/view-account/account-info" element={<AccountInfo />}/>
                    <Route path="/view-account/edit" element={<EditAccount />}/>
                    <Route path="/view-account/orders" element={<ViewOrder />}/>
                    <Route path="/view-account/wishlist" element={<ViewWishlist />}/>

                    <Route path="/category" element={<CategoryPage />}/>
                    <Route path="/category/:slug" element={<Category />}/>

                    <Route path="/payment-success" element={<PaymentPage />}/>
                    <Route path="/about" element={<About />}/>
                    <Route path="*" element={<Error />}/>
                </Routes>
                <Footer/>
            </AppContext>
        </BrowserRouter>
    );
}

export default App;
