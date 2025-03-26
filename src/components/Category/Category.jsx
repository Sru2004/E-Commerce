import "../Products/Products.css";
import Product from "../Products/Product/Product";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../Context";

function Category() {
    const { slug } = useParams();
    const { products } = useContext(Context);

    const [product, setProduct] = useState(undefined);

    useEffect(() => {
        if (slug === 'newArrival') {
            setProduct(products?.filter((product) => {
                return product?.newArrival === true;
            }))
        }
        else if (slug === 'anime') {
            setProduct(products?.filter((product) => {
                return product?.category === "Anime";
            }))
        }
        else if (slug === 'marvel') {
            setProduct(products?.filter((product) => {
                return product?.category === "Marvel";
            }))
        }
        else if (slug === 'gym') {
            setProduct(products?.filter((product) => {
                return product?.category === "Gym";
            }))
        }
        else if (slug === 'all') {
            setProduct(products)
        }
    }, [products])

    return (
        <div className="products-main-div">
            <div className="products-category-heading">
                {slug.charAt(0).toUpperCase() + slug.slice(1)} Category
            </div>
            <div className="product-collection-div">
                {
                    product ?
                        (product.length !== 0) ?
                            product.map((product) => (
                                <Product key={product.slug} img={product.img[0]} title={product.title} slug={product.slug} category={product.category} price={product.price} originalPrice={product.originalPrice} />
                            ))
                            : <div className="no-products-div">No Products Found</div>
                        : <div className="loading-spinner"></div>
                }
            </div>
        </div>
    )
}

export default Category;