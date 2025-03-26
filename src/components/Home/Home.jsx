import "./Home.css";
import Banner from "../Home/Banner/Banner";
import Products from "../Products/Products";
import NewsLetter from "../Footer/NewsLetter/NewsLetter";
import { useEffect, useContext, useState } from "react";
import { Context } from "../../Context";

function Home() {
    const { products } = useContext(Context);

    const [newArrival, setNewArrivals] = useState([]);
    const [anime, setAnime] = useState([]);
    const [marvel, setMarvel] = useState([]);
    const [gym, setGym] = useState([]);

    useEffect(() => {
        if (products) {
            setNewArrivals(
                products.filter((product) => product?.newArrival === true)
            );
            setAnime(
                products.filter((product) => product?.category === "Anime")
            );
            setMarvel(
                products.filter((product) => product?.category === "Marvel")
            );
            setGym(products.filter((product) => product?.category === "Gym"));
        }
    }, [products]);

    return (
        <div className="home">
            <Banner />
            <Products products={newArrival} title="New Arrivals" />
            {/* Uncomment the sections below if they are ready for use */}
            {/* 
            <Category />
            <Products products={anime} title="Anime Merchandise" />
            <Advertisement text="Refer and Earn Dusty Coins" />
            <Products products={marvel} title="Marvel Merchandise" />
            <Advertisement text="Create Account to Get 100 Dusty Coins" />
            <Products products={gym} title="Gym Merchandise" />
            */}
            <NewsLetter />
        </div>
    );
}

export default Home;
