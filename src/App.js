import logo from './logo.svg';
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import {useNavigate, useRoutes} from "react-router-dom";
import route from "./routes";
import "./Styles/style.css"
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css"
import UserContext from "./Context/Context"
import {useEffect, useState} from "react";
import {useLogin} from "./Hooks/useLogin";

function App() {
    const routes = useRoutes(route)
    const [user, setUser] = useState({})
    const [isLogin, setIsLogin] = useState(null)
    useLogin(user, setUser, isLogin, setIsLogin)
    return (
        <>
            <UserContext.Provider value={[user, setUser, isLogin, setIsLogin]}>
                {/*<Navbar/>*/}
                {routes}
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </UserContext.Provider>
            {/*<Footer/>*/}
        </>
    );
}

export default App;
