import "./DeliveryBox.scss";
import {BiSolidEditAlt} from "react-icons/bi";
import {AiFillDelete} from "react-icons/ai";

function DeliveryBox(){
    return(
        <div className="delivery-box-main-div">
            <div className="delivery-box-left-div">
                <div className="cust-name-text">Srujana Toukare</div>
                <div className="add-line">Maratha Colony</div>
                <div className="add-line">Bhagawa Chowk ,Kasaba Bawada</div>
                <div className="add-line">Kolhapur - <span>416006</span></div>
                <div className="add-line">Mobile: +919370942875</div>
            </div>
            <div className="delivery-box-right-div">
                <BiSolidEditAlt className="delivery-icons"/>
                <AiFillDelete className="delivery-icons"/>
            </div>
        </div>
    )
}

export default DeliveryBox;