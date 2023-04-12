import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import {useContext} from "react";
import UserContext from "../../Context/Context";

export default function Index() {
    const user = useContext(UserContext);
    // console.log(user)
    return (
        <>
            <Navbar/>
            <Header/>
            <Footer/>
        </>
    )
}