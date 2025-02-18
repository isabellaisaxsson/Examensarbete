import "./style/Hem.css"
import Carousel from "../components/carouselFunction";

const Hem = () => {
    return(
<div>
    <div className="section-1">
        <div className="background-box">
            <div className="flex-hero">
                <div className="product-display">
                    <div className="box"></div>
                </div>
                <div className="title-text">
                    <h1>Skattkistan - Secondhand med hjärta</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </div>
            </div>
        </div>
    </div>

    <div className="section-2">
            <Carousel />
    </div>

</div>
    );
    
};

export default Hem;
