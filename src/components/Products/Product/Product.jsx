import "./Product.css";
import {useNavigate} from "react-router-dom";
import {AiOutlineHeart} from "react-icons/ai";

function Product({slug, img, title, category, price, originalPrice}){

    const navigate = useNavigate();

    return(
        <div className="product-card" onClick={()=>navigate(`/product/${slug}`)}>
            <img src={img} alt="Product1" className="product-img" />
            <div className="product-details-div">
                <div className="product-card-left-div">
                    <div className="product-title">{title}</div>
                    <div className="product-category">{category}</div>
                    <div className="product-price-div">
                        <div className="product-price">₹{price}</div>
                        <div className="product-original-price"><del>₹{originalPrice}</del></div>
                    </div>
                </div>
                <div className="product-card-right-div">
                    <AiOutlineHeart className="like-icon"/>
                </div>
            </div>
        </div>
    )
}

export default Product;
