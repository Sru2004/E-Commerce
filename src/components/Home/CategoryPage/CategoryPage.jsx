import "./Category.css";
import {useNavigate} from "react-router-dom";

import c1 from "../../../assets/Categories_Img/anime-img1.png"
import c2 from "../../../assets/Categories_Img/gym-img1.png"
import c3 from "../../../assets/Categories_Img/marvel-img1.png"
import c4 from "../../../assets/Categories_Img/todbag.png"

function CategoryPage (){

    const navigate = useNavigate()

    return(
        <div className="category-main-div">
            <div className="section-heading">
                Categories
            </div>
            <div className="categories-img-div">
                <div onClick={()=>navigate(`/category/anime`)} className="category"
                    style={{backgroundImage: `url('${c1}')`}}>
                    <span className="category-links">{"Anime"}</span>
                </div>
                <div onClick={()=>navigate(`/category/gym`)} className="category"
                    style={{backgroundImage: `url('${c2}')`}}>
                    <span className="category-links">{"Gym"}</span>
                </div>
                <div onClick={()=>navigate(`/category/marvel`)} className="category"
                    style={{backgroundImage: `url('${c3}')`}}>
                    <span className="category-links">{"Marvel"}</span>
                </div>
                <div onClick={()=>navigate(`/category/todebags`)} className="category"
                    style={{backgroundImage: `url('${c4}')`}}>
                    <span className="category-links">{"Tode Bags"}</span>
                </div>
            </div>
        </div>
    )
}

export default CategoryPage;