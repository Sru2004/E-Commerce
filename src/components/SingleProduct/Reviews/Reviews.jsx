import "./Reviews.css";
import {AiFillStar, AiOutlineLike, AiOutlineDislike} from "react-icons/ai";

function Reviews({custName, star, desc}){
    return(
        <div className="review-main-div">
            <div className="reviews-left-div">
                <span>S</span>
            </div>
            <div className="reviews-right-div">
                <div className="review-r1">
                    <div className="review-r1-left">
                        <span className="cust-name">{custName}</span>
                        <span className="product-page-rating"><AiFillStar className="product-rating-icon"/> {star} Ratings</span>
                        {/* <span className="review-date">27/06/2023</span> */}
                    </div>
                    <div className="review-r1-right">
                        <AiOutlineLike className="review-icon"/>
                        <AiOutlineDislike className="review-icon"/>
                    </div>
                </div>
                <div className="review-r2">
                    {desc}
                </div>
            </div>
        </div>
    )
}

export default Reviews;