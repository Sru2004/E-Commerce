import "./Products.css";
import Product from "./Product/Product";

function Products({title, products}){

    return(
        <div className="products-main-div">
            <div className="products-category-heading">
                {title}
            </div>
            <div className="product-collection-div">
                {   
                    products ?
                    (products.length!==0)?
                        products.map((product)=>(
                            <Product key={product.slug} img={product.img[0]} title={product.title} slug={product.slug} category={product.category} price={product.price} originalPrice={product.originalPrice}/>
                        ))
                        : <div className="no-products-div">No Products Found</div>
                    : <div className="loading-spinner"></div>
                }
            </div>
        </div>
    )
}

export default Products;