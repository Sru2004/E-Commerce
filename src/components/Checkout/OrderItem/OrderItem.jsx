import './OrderItem.css';

function OrderItem({img, title, price, size, quantity}){

    return(
        <div className="order-item-main-div">
            <img src={img} alt="p-img" className="order-pimg"/>
            <div className="order-item-details">
                <div className="order-item-pname">{title}</div>
                <div className="order-item-pPrice">₹{price}/-</div>
                {/* <div className="order-item-pSize">Size: {size}</div> */}
                <div className="order-item-quantity-btn-div">
                    {/* <button value="-" className="item-count-btn">-</button> */}
                    <div className="order-item-quantity-text">Qty: {quantity}</div>
                    {/* <button value="+" className="item-count-btn">+</button> */}
                </div>
            </div>

        </div>
    )
}

export default OrderItem;