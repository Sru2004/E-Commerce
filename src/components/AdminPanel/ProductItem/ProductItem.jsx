import "./ProductItem.css";

function ProductItem({ slug, img, title, price, size, quantity }) {
    return (
        <div className="cart-item-main-div">
            <img src={img} alt="product" className="cart-pimg" />
            <div className="cart-item-details">
                <div className="cart-item-pname">{title}</div>
                <div className="cart-item-pPrice">₹{price}/-</div>
                {size && <div className="cart-item-pSize">Size: {size}</div>}
                <div className="cart-item-quantity-btn-div">
                    <div className="cart-item-quantity-text">Qty: {quantity}</div>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
