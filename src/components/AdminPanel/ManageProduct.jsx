import "./AdminPanel.css";
import AccountSideBar from "./AccountSideBar";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../Context";
import Product from "../Products/Product/Product";

function ManageProduct() {
    const { loginInfo } = useContext(Context);
    const { products, setProducts } = useContext(Context);

    const [productList, setProductList] = useState([]);

    // Update the product list when products change in context
    useEffect(() => {
        setProductList(products);
    }, [products]);

    // Remove product function
    const removeProduct = (slug) => {
        setProductList((prevProducts) => prevProducts.filter((p) => p.slug !== slug));
        setProducts((prevProducts) => prevProducts.filter((p) => p.slug !== slug)); // Update context as well
    };

    return (
        loginInfo?.status ?
            <div className="view-account-main-div">
                <AccountSideBar />
                <div className="view-account-right">
                    <div className="view-account-right-main-heading">Manage Products</div>

                    {/* Product Collection */}
                    <div className="product-collection-div1">
                        {productList.length > 0 ? (
                            productList.map((product) => (
                                <div key={product.slug} className="product-item">
                                    <Product
                                        img={product.img || 'default-image-url.jpg'} // Provide a default image if none is given
                                        title={product.title}
                                        slug={product.slug}
                                        category={product.category}
                                        price={product.price}
                                        originalPrice={product.originalPrice}
                                    />
                                    {/* Remove Button */}
                                    <button onClick={() => removeProduct(product.slug)} className="remove-product-btn">
                                        Remove
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="no-products-div">No Products Found</div>
                        )}
                    </div>
                </div>
            </div>
            : <div className="not-login-error">Login to View this Page</div>
    );
}

export default ManageProduct;
