import "./searchPage.css"
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SearchBox from "../../Components/SearchBox/SearchBox";
import {useState} from "react";
import PrevSearchItem from "../../Components/PrevSearchItem/PrevSearchItem";
import {Link} from "react-router-dom";

export default function SearchPage() {
    const [search, setSearch] = useState("")
    const [products, setProducts] = useState(null)
    const onSearchChange = (value) => {
        setSearch(value)
        fetch(`http://127.0.0.1:8000/products/api/v1/products/?search=${value}`)
            .then(res => res.json())
            .then(res => {
                setProducts(res.slice(0,3))
            })
    }
    return (
        <>
            <Navbar/>
            <section className="main-container">
                <div className="main-section">
                    <SearchBox onSearchChange={onSearchChange} search={search}/>
                    {products && <div className="search-result-container show">
                        <div id="search-res-container" className="search-result-section">
                            {products.map(product => (
                                <PrevSearchItem key={product.id} image={product.image} title={product.title}
                                                created_date={product.created_date} description={product.title}/>
                            ))}
                        </div>
                        <div className="show-more-button">
                            <i className="fa-solid fa-circle-plus"></i>
                            <Link to={`/search-results?search=${search}`}>نتایج بیشتر</Link>
                        </div>
                    </div>}
                </div>
            </section>
            <Footer/>
        </>
    )
}