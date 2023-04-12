export default function PrevSearchItem({image, title, created_date, description}) {
    return (
        <div className="search-result-item">
            <div className="search-result-item-image">
                {/*<img src="./images/stranger.jpg" alt="test"/>*/}
                <img src={image} alt="test"/>
            </div>
            <div className="search-result-item-content">
                <h2 className="search-result-item-content-header">
                    {/*بهترین گوشی دنیا*/}
                    {title}
                </h2>
                <p className="search-result-item-content-date">
                    <i style={{marginLeft: "5px"}} className="fa-solid fa-calendar"></i>
                    {/*12 فروردین */}
                    {created_date}
                </p>
                <p className="search-result-item-content-text">Lorem ipsum dolor sit amet,
                    consectetur
                    adipisicing
                    elit. Ab ea est harum impedit inventore ipsam iste minima molestias optio
                    perspiciatis
                    tempore vitae, voluptates. Architecto distinctio ducimus, illo illum praesentium
                    velit.</p>
            </div>
        </div>
    )
}