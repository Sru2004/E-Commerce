import LogoImg from "../../assets/logo.png";
import "./Header.css";
import { IoSearchSharp } from 'react-icons/io5';
import { VscAccount } from 'react-icons/vsc';
import { FiShoppingCart } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { BsFillCaretDownFill } from "react-icons/bs";
import { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import Cart from "../Cart/Cart";
import { Link, useNavigate } from "react-router-dom";
import {Context} from "../../Context";

function Header() {

    const navigate = useNavigate()
    const responsiveLinkDiv = useRef();
    const [cartStatus, setCartStatus] = useState(false);

    const accountBox = useRef()

    const {loginInfo, setLoginInfo, cart} = useContext(Context);

    function onHamburgerClick() {
        responsiveLinkDiv.current.style.animation = "hamburgerAnimation 0.5s ease forwards";
        responsiveLinkDiv.current.style.display = "block";
    }

    function onCloseBtn() {
        responsiveLinkDiv.current.style.animation = "closeAnimation 0.5s ease forwards";
        setTimeout(() => {
            responsiveLinkDiv.current.style.transform = "translateX(-100%)";
            responsiveLinkDiv.current.style.display = "none";
        }, 500);
    }

    function UpdateCartStatus() {
        if (cartStatus === true) {
            setCartStatus(false);
        }
        else {
            setCartStatus(true);
        }
    }

    const [scrolled, setScrolled] = useState(false);

    function handleScroll() {
        const offset = window.scrollY;
        if (offset > 50) {
            setScrolled(true);
        }
        else {
            setScrolled(false);
        }
    }

    function handleLogout(){
        setLoginInfo({status: false})
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, [])

    return (
        <nav>
            <div className={`navbar ${scrolled ? "sticky-nav" : ""}`}>
                <GiHamburgerMenu className="nav-icons responsive-hamburger-logo" onClick={onHamburgerClick} />
                <div className="left-nav-div">
                    <div className="left-nav" onClick={() => navigate("/")}>
                        <img src={LogoImg} alt="Dusty Zone" className="logo-icon" />
                        <div className="logo-text">D-Delight</div>
                    </div>
                </div>
                <div className="right-nav">
                    <div className="nav-links-div">
                        <ul>
                            <li>
                                <div className="dropdown nav-links" onClick={() => navigate('/category/newArrival')}>
                                    New Arrivals
                                </div>
                            </li>
                            <li>
                                {/* <div className="dropdown nav-links" onClick={() => navigate('/category')}>
                                    Categories
                                </div> */}
                            </li>
                            <li>
                                <div className="dropdown nav-links" onClick={() => navigate('/category/all')}>
                                    All Products
                                </div>
                            </li>
                            <li>
                                <div onClick={() => navigate('/about')} className="dropdown nav-links">
                                    About Us
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="nav-icons-div">
                        <div className="search-bar">
                            <input type="text" placeholder="Search Here..." className="search-input" />
                            <IoSearchSharp className="search-logo" />
                        </div>
                        <IoSearchSharp className="nav-icons responsive-search-logo" />
                        <div className="account-main-nav-div account-icon-hover">
                            {   
                                loginInfo?.status ? 
                                <span className="account-logo-letter account-icon-hover">{loginInfo?.name?.charAt(0)}</span>
                                :
                                <>
                                    <VscAccount className="nav-icons nav-account-icon account-icon-hover" />
                                    <BsFillCaretDownFill className="nav-down-arrow" />
                                </>
                            }
                            <div ref={accountBox} className="account-box-main-div">
                                <div className="account-cust-name">{`Welcome, ${loginInfo?.status ? loginInfo.name : "Guest"}`}</div>
                                <div className="account-btn-div">
                                {
                                    loginInfo?.status ? 
                                    <>
                                        {
                                            (loginInfo.role==="User")?
                                            <Link to='/view-account' className="account-btn">View Account</Link>
                                            : 
                                            <Link to='/admin-panel' className="account-btn">Admin Panel</Link>
                                        }
                                        <button className="account-btn" onClick={handleLogout}>Logout</button>
                                    </>
                                    :
                                    <>
                                        <Link to='/login' className="account-btn">Login</Link>
                                        <Link to='/register' className="account-btn">Sign Up</Link>
                                        <Link to='/admin' className="account-btn">Admin</Link>
                                    </>
                                }
                                </div>
                            </div>
                        </div>
                        <div className="shopping-cart-hover-div" onClick={UpdateCartStatus}>
                            <FiShoppingCart className="nav-icons" />
                            <span className="cart-no">{cart ? cart?.length : 0}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={responsiveLinkDiv} className="responsive-nav-links-div">
                <div className="close-btn-div">
                    <AiOutlineClose className="nav-icons responsive-close-icon" onClick={onCloseBtn} />
                </div>
                <ul>
                    <li><Link onClick={onCloseBtn} to='/category/newArrival' className="responsive-nav-links">New Arrivals</Link></li>
                    <li><Link onClick={onCloseBtn} to='/category' className="responsive-nav-links">Categories</Link></li>
                    <li><Link onClick={onCloseBtn} to='/category/all' className="responsive-nav-links">All Products</Link></li>
                    <li><Link onClick={onCloseBtn} to='/about' className="responsive-nav-links">About Us</Link></li>
                    <li><Link onClick={onCloseBtn} to='/' className="responsive-nav-links">Home</Link></li>
                </ul>
            </div>
            <Cart cartStatus={cartStatus} setCartStatus={setCartStatus} />
        </nav>
    )
}

export default Header;