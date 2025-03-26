import "./Banner.css";

function Banner() {
    return (
        <div className="banner-main-div">
            <div className="banner-content">
                <h1 className="banner-heading">Welcome to Drink-Delight!</h1>
                <div className="banner-subheading">Exciting Anime-Inspired Beverages Await</div>
                
                {/* Special Advertisements */}
                <div className="banner-advertisements">
                    <div className="advertisement-item">
                        <h2>🌸 Samurai Splash</h2>
                        <p>Buy 1 Get 1 Free - Cherry Blossom Delight</p>
                    </div>
                    <div className="advertisement-item">
                        <h2>⚡ Ninja Nectar</h2>
                        <p>20% Off for First-Time Buyers - Refreshing Citrus Boost</p>
                    </div>
                    <div className="advertisement-item">
                        <h2>🔥 Dragon Fruit Fizz</h2>
                        <p>Limited Edition: Get 2 for the Price of 1!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;
