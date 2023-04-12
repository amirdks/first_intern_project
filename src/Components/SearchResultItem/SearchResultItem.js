export default function SearchResultItem({image, title, price}) {
    return (
        <div className="result-item-container">
            <div className="result-item-section">
                <div className="result-item-image">
                    {/*<img src="./images/stranger.jpg" alt=""/>*/}
                    <img src={image} alt=""/>
                </div>
                <div className="result-item-text">
                    <h2 className="result-item-header">{title}</h2>
                    {/*<h2 className="result-item-header">فیلم خفن چیزهای عجیب</h2>*/}
                    <p className="result-item-description">این فیلم یکی از بهترین هاست</p>
                    <p className="result-item-price">${price}</p>
                    {/*<p className="result-item-price">$38.00</p>*/}
                </div>
                <div className="result-item-button">
                    <i className="fa-solid fa-cart-plus"></i>
                    <a href="#">افزودن به سبد خرید</a>
                </div>
            </div>
        </div>
    )
}