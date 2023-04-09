import {useContext} from "react";
import UserContext from "../../Context/Context";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function PrivateRoute() {
    const [user, setUser, isLogin, setIsLogin] = useContext(UserContext);
    const location = useLocation();
    return (
        <>
            {isLogin ? (
                <Outlet/>
            ) : (
                <>
                    {/*<Navbar/>*/}
                    {/*<h1>shoma ijaze nadarid</h1>*/}
                    {/*<Footer/>*/}
                    <Navigate to={`/login?next=${location.pathname}`}/>
                </>
            )}
        </>
    )
}