import "./NewsLetter.css";

import {BsFacebook, BsTwitter, BsLinkedin} from "react-icons/bs";
import {BiLogoInstagramAlt} from "react-icons/bi";

function NewsLetter(){
    return(
        <div className="special-offer-section-div">
            <div>
                
                <div className="social-media-icons-div">
                    <BsFacebook className="social-media-icons"/>
                    <BiLogoInstagramAlt className="social-media-icons"/>
                    <BsTwitter className="social-media-icons"/>
                    <BsLinkedin className="social-media-icons"/>
                </div>
            </div>
        </div>
    )
}

export default NewsLetter;