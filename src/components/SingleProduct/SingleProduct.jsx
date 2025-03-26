import "./SingleProduct.css";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { AiOutlineHeart, AiFillStar } from "react-icons/ai";
import { FiShoppingCart } from 'react-icons/fi';

import Reviews from "./Reviews/Reviews";
import Products from "../Products/Products";

import { useParams, useNavigate } from "react-router-dom";

import {useState, useContext, useEffect} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { Context } from "../../Context";

function SingleProduct() {

    const [size, setSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [products, setProducts] = useState(undefined);
    const [product, setProduct] = useState(undefined);

    const [related, setRelated]= useState(undefined);

    const {slug} = useParams();

    const {loginInfo, getCartDetailsFunc} = useContext(Context);

    const [cart, setCart] = useState(undefined);

    const navigate = useNavigate();
    
    async function getAllProducts(){
        await axios.get(process.env.REACT_APP_BASE_URL+"/product/get-all").then(res=>{
            setProducts(res?.data?.data);
        }).catch(error=>{
            console.log(error);
        })
    }
    
    useEffect(()=>{
        try{
            let newProduct = products?.filter((elm)=>{
                return elm.slug === slug;
            });
            setProduct(newProduct[0]);

            setRelated(products?.filter((product)=>{
                return product?.category===newProduct[0].category;
            }))
        }
        catch(error){

        }
    }, [products, slug])

    useEffect(()=>{
        getAllProducts();
    }, [])

    function clickSetSize(e) {
        setSize(e.target.value);
    }

    function updateQuantity(e) {
        if (e.target.value === "-" && quantity > 1) {
            setQuantity(quantity - 1);
        }
        else if (e.target.value === "+") {
            setQuantity(quantity + 1);
        }
    }

    function prevImgFunc() {
        console.log("Previous Image");
    }

    function nextImgFunc() {
        console.log("Next Image");
    }

    async function handleWishlist() {
        await axios.post(process.env.REACT_APP_BASE_URL+"/auth/add-wishlist", {cart: product, email: loginInfo.email, role: loginInfo.role}).then(res=>{
            toast.success(res?.data?.message, {
                position: 'bottom-right'
            })
            getCartDetailsFunc();
        }).catch(error=>{
            toast.error(error?.response?.data?.message, {
                position: 'bottom-right'
            })
        })
    }

    function addToCartFunc(){
        // if(size===""){
        //     toast.error("Please Select Preferred Size", {
        //         position: 'bottom-right'
        //     })
        // }
        // else{
        //     setCart({...product, size: size, qty: quantity});
        // }
        setCart({...product, size: size, qty: quantity});

    }

    async function addToCartCall(){
        if(loginInfo?.status===true){
            await axios.post(process.env.REACT_APP_BASE_URL+"/auth/add-cart", {cart, email: loginInfo.email, role: loginInfo.role}).then(res=>{
                toast.success(res?.data?.message, {
                    position: 'bottom-right'
                })
                getCartDetailsFunc();
            }).catch(error=>{
                toast.error(error?.response?.data?.message, {
                    position: 'bottom-right'
                })
            })
        }
        else{
            navigate('/login');
        }
    }

    useEffect(()=>{
        if(cart!==undefined){
            addToCartCall();
        }
    }, [cart])

    return (
        <div>
            <ToastContainer />
            <>
                <div className="SingleProduct-div">
                    <div className="SingleProduct-main-div">
                        <div className="product-left-div">
                            <GrFormPrevious onClick={prevImgFunc} className="product-nav-btn" />
                            <img src={product?.img[0]} alt="p1" className="product-page-img" />
                            <GrFormNext onClick={nextImgFunc} className="product-nav-btn" />
                        </div>
                        <div className="product-right-div">
                            <div className="product-title-div-left">
                                <div className="product-page-title">{product?.title}</div>
                                <div className="product-more-details">
                                    <div className="product-page-category">{product?.category}</div>
                                </div>
                                <div className="product-prices-div">
                                    <div className="product-page-price">₹{product?.price}</div>
                                    <div className="product-page-original-price"><del>₹{product?.originalPrice}</del></div>
                                </div>
                                {/* <div className="choose-size-div">
                                    <div className="choose-size">Choose your Size: </div>
                                    <div className="choose-size-btn-div">
                                        {product?.size?.s ? <button onClick={clickSetSize} value={"s"} className={`${(size === "s") ? "active-size" : ""} size-btn`} >{"s".toUpperCase()}</button>: <></>}    
                                        {product?.size?.m ? <button onClick={clickSetSize} value={"m"} className={`${(size === "m") ? "active-size" : ""} size-btn`} >{"m".toUpperCase()}</button>: <></>}    
                                        {product?.size?.l ? <button onClick={clickSetSize} value={"l"} className={`${(size === "l") ? "active-size" : ""} size-btn`} >{"l".toUpperCase()}</button>: <></>}    
                                        {product?.size?.xl ? <button onClick={clickSetSize} value={"xl"} className={`${(size === "xl") ? "active-size" : ""} size-btn`} >{"xl".toUpperCase()}</button>: <></>}    
                                        {product?.size?.xxl ? <button onClick={clickSetSize} value={"xxl"} className={`${(size === "xxl") ? "active-size" : ""} size-btn`} >{"xxl".toUpperCase()}</button>: <></>}    
                                    </div>
                                    <a href="/" className="size-chart-link">See Size Chart</a>
                                </div> */}
                                
                                <div className="select-quantity-div">
                                    <div className="select-quantity-title">Quantity:</div>
                                    <div className="select-quantity-btn-div">
                                        <button onClick={updateQuantity} value="-" className="select-count-btn">-</button>
                                        <div className="product-quantity-text">{quantity}</div>
                                        <button onClick={updateQuantity} value="+" className="select-count-btn">+</button>
                                    </div>
                                </div>
                                <div className="product-buy-btn-div">
                                    <button onClick={addToCartFunc} className="add-to-cart-btn">Add to Cart <FiShoppingCart className="product-summary-btn-icons" /></button>
                                    <button onClick={handleWishlist} className="wishlist-btn">Wishlist <AiOutlineHeart className="product-summary-btn-icons" /></button>
                                </div>
                                <div className="product-desc-div">
                                    <div className="product-desc-title">Description: </div>
                                    <div className="product-desc-text">
                                        <span>Product Name: </span> {product?.title} <br />
                                        <span>Price: </span> ₹{product?.price}/- <br />
                                        {/* <span>Category: </span> {product?.category} <br /> */}
                                        <span>Status: </span> Available <br />
                                        {/* <span>Generic Name:</span> {product?.subCategory} <br /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="product-customer-reviews-div">
                    <div className="section-heading">Customer Reviews <span className="product-page-rating"><AiFillStar className="product-rating-icon" /> {"No Reviews Yet"} Ratings</span></div>
                    <div className="all-product-reviews-div">
                            <Reviews custName={"Soham Tamhane"} star={4} desc={"Lorem100"} />
                        <div className="see-more-div"><a href="/" className="see-more-btn">See More →</a></div>
                    </div>
                </div> */}
                <Products  products={related} title="Related Products" />
            </>
        </div>
    )
}

export default SingleProduct;