import "./CartItem.css";
import {IoMdCloseCircle} from "react-icons/io";
import { Context } from "../../../Context";
import { useContext } from "react";
import axios from "axios";

function CartItem({slug, img, title, price, size, quantity}){

    const {loginInfo, getCartDetailsFunc} = useContext(Context);

    async function removeCartItemFunc(){
        await axios.post(process.env.REACT_APP_BASE_URL+'/auth/del-cart', {email: loginInfo.email, role: loginInfo.role, slug, size, qty: quantity}).then(res=>{
            getCartDetailsFunc();
        }).catch(error=>{
            console.log(error?.response?.data?.message);
        })
    }

    return(
        <div className="cart-item-main-div">
            <img src={img} alt="p-img" className="cart-pimg"/>
            <div className="cart-item-details">
                <div className="cart-item-pname">{title}</div>
                <div className="cart-item-pPrice">₹{price}/-</div>
                
                <div className="cart-item-quantity-btn-div">
                    {/* <button value="-" className="item-count-btn">-</button> */}
                    <div className="cart-item-quantity-text">Qty: {quantity}</div>
                    {/* <button value="+" className="item-count-btn">+</button> */}
                </div>
                <IoMdCloseCircle onClick={removeCartItemFunc} className="remove-item-icon"/>
            </div>

        </div>
    )
}

export default CartItem;