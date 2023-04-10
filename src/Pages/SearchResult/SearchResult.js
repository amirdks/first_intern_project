import "./itemListResult.css"
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import SearchResultItem from "../../Components/SearchResultItem/SearchResultItem";
import {useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Loading from "../../Components/Loading/Loading";

export default function SearchResult() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        let search = searchParams.get("search")
        if (search) {
            fetch(`http://127.0.0.1:8000/products/api/v1/products/?search=${search}`)
                .then(res => res.json())
                .then(res => {
                    setProducts(res)
                    setLoading(false)
                })
        } else {
            fetch(`http://127.0.0.1:8000/products/api/v1/products/`)
                .then(res => res.json())
                .then(res => {
                    setProducts(res)
                    setTimeout(()=>{
                        setLoading(false)
                    }, 1000)
                })
        }

    }, [])
    return (
        <>
            <Navbar/>
            <section className="main-container">
                <div className="main-section">
                    <h1 className="main-header">
                        نتایح جست و جوی شما
                    </h1>
                    <div className="result-container">
                        {products && products.map(product => (
                            <SearchResultItem key={product.id} image={product.image} title={product.title}
                                              price={product.price}/>
                        ))}
                    </div>
                </div>
                {loading && (
                    <Loading/>
                )}
            </section>
            <Footer/>
        </>
    )
}