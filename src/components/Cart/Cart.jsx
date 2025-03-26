
import "./Cart.css";
import { AiOutlineClose } from 'react-icons/ai';
import { useRef, useState, useEffect, useContext } from "react";
import {useNavigate} from "react-router-dom";
import productImg1 from "../../assets/product1.png"
import CartItem from "./CartItem/CartItem";
import axios from "axios";
import { Context } from "../../Context";


// cartStatus coming from Header Component
function Cart({cartStatus, setCartStatus}){

    const navigate = useNavigate();

    const [loginStatus, setLoginStatus] = useState(0);

    const [totalPrice, setTotalPrice] = useState(0);

    const {loginInfo, cart, setCart, getCartDetailsFunc} = useContext(Context);

    const cartBlackDiv = useRef();
    const cartMainDiv = useRef();

    function OpenCartScreen(){
        cartMainDiv.current.style.animation = "cartAnimation 0.5s ease forwards";
        cartBlackDiv.current.style.display = "block";
    }

    function CloseCartScreen(){
        cartMainDiv.current.style.animation = "closeCartAnimation 0.5s ease forwards";
        setTimeout(()=>{
            cartMainDiv.current.style.transform = "translateX(100%)";
            cartBlackDiv.current.style.display = "none";
        }, 500);
        setCartStatus(false);
    }

    function CartDivClicked(e){
        e.stopPropagation();
    }

    useEffect(()=>{
        if(cartStatus===true){
            OpenCartScreen();
        }
        else{
            CloseCartScreen();
        }
    }, [cartStatus])

    useEffect(()=>{
        if(loginInfo.status===true){
            getCartDetailsFunc();
        }
    }, [loginInfo])

    useEffect(()=>{
        if(cart){
            let total = 0;
            cart.map((elm)=>{
                total = total + (elm.price*elm.qty);
            })
            setTotalPrice(total);
        }
    }, [cart])

    return(
        <div ref={cartBlackDiv} onClick={CloseCartScreen} className="cart-main-div">
            <div ref={cartMainDiv} onClick={CartDivClicked} className="shopping-cart-main-div">
                <AiOutlineClose onClick={CloseCartScreen} className="shopping-cart-close-btn"/>
                <div className="shopping-cart-title">
                    Cart </div>
                <div className="shopping-cart-items-div">
                    {   
                        cart ? 
                            cart.map((product)=>(
                                <>
                                    <CartItem slug={product?.slug} key={product.slug+product.size+product.qty} img={product?.img[0]} title={product?.title} price={product?.price} size={product?.size} quantity={product?.qty}/>
                                    
                                </>
                            ))
                        : <></>
                    }
                </div>
                <div className="cart-buy-now-div">
                    <div className="cart-total-price-div"><div>Total Price:</div><div>₹{totalPrice}/-</div></div>
                    {
                    loginInfo.status ? 
                        <button onClick={()=>{
                            navigate('/checkout')
                            CloseCartScreen()
                        }} className="cart-buy-now-btn">Proceed To Payment</button>
                        : <button onClick={()=>{
                            navigate('/login') 
                            CloseCartScreen()
                        }} className="cart-buy-now-btn">Login to See Cart</button>

                    }
                </div>
            </div>
        </div>
    )
}

export default Cart;