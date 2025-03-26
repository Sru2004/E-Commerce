import './Footer.css';
import LogoImg from "../../assets/logo.png";
import { Link } from 'react-router-dom';

function Footer(){

    return(
        <footer>
            <div className="footer-div">
                <div className="footer-heading-div">
                    <a href="#" className="footer-heading">
                        <img src={LogoImg} alt="website-logo" className="footer-logo" />
                        <div className="footer-logo-text">Drink Delight</div>
                    </a>
                </div>
                <div className="footer-links-div">
                    <div className="footer-section">
                        <ul>
                            <li><span className="footer-links-heading">Our Products</span></li>
                            <li><Link to="/category/newArrival" className="footer-links">New Arrivals</Link></li>
                            <li><Link to="/category/anime" className="footer-links">Anime</Link></li>
                            <li><Link to="/category/marvel" className="footer-links">Marvel</Link></li>
                            <li><Link to="/category/gym" className="footer-links">Gym</Link></li>
                            <li><Link to="/category/todebags" className="footer-links">Tode Bags</Link></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <ul>
                            <li><span className="footer-links-heading">Quick Links</span></li>
                            <li><Link to='/' className="footer-links">Home</Link></li>
                            <li><Link to='/about' className="footer-links">About</Link></li>
                            <li><Link to='/term-of-service' className="footer-links">Term of Service</Link></li>
                            <li><Link to='/privacy-policy' className="footer-links">Privacy Policy</Link></li>
                            <li><Link to='/cancellation' className="footer-links">Cancellation Policy</Link></li>
                            <li><Link to='/support' className="footer-links">Customer Support</Link></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <ul>
                            <li><span className="footer-links-heading">Account</span></li>
                            <li><a href="#" className="footer-links">Our Account</a></li>
                            <li><a href="#" className="footer-links">Wishlist</a></li>
                            <li><a href="#" className="footer-links">Cart Details</a></li>
                            <li><a href="#" className="footer-links">Order History</a></li>
                            <li><a href="#" className="footer-links">Track Order</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <ul>
                            <li><span className="footer-links-heading">Social Media</span></li>
                            <li><a href="#" className="footer-links">Website</a></li>
                            <li><a href="#" className="footer-links">Instagram</a></li>
                            <li><a href="#" className="footer-links">Facebook</a></li>
                            <li><a href="#" className="footer-links">Twitter</a></li>
                            <li><a href="#" className="footer-links">Linkedin</a></li>
                            <li><a href="#" className="footer-links">Telegram</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-copyright-div">
                <div className="footer-copyright-text">
                       Drink Delight 2024  | All Rights Reserved
                </div>
            </div>
        </footer>
    )
}

export default Footer;