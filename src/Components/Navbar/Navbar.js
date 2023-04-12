import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faRightFromBracket, faUser} from "@fortawesome/free-solid-svg-icons";
import {Link, NavLink} from "react-router-dom";
import {useContext, useState} from "react";
import UserContext from "../../Context/Context";
import notification from "../../Utils/Toastify";

export default function Navbar() {
    // const [user, setUser] = useContext(UserContext);
    const [user, setUser, isLogin, setIsLogin] = useContext(UserContext);
    // const [user, setUser] = useState(user1)
    const logoutHandler = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // setUser(prevSate => {
        //     return {user: null, isLogin: false}
        // })
        setUser(null)
        setIsLogin(false)
        notification("شما با موفقیت خارج شدید", "success")
    }
    return (
        <nav id="navbar-container">
            <div id="navbar-section">
                <div className="logo">
                    {/*<i className="fa-solid fa-magnifying-glass"></i>*/}
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </div>
                <div className="right-navbar">
                    <ul className="main-right-navbar-container">
                        <li><NavLink to={"/"}>خانه</NavLink></li>
                        <li><NavLink to={"/search-results"}>همه محصولات</NavLink></li>
                        <li><NavLink to={"/search"}>جست و جو</NavLink></li>
                        <li><NavLink to={"/new-product"}>قرار دادن محصول جدید</NavLink></li>
                        <li><a href="#">درباره ی ما</a></li>
                    </ul>
                </div>
                <div className="left-navbar">
                    {/*<a href="login.html" className="button-34">ورود / ثبت نام</a>*/}

                    {/*<FontAwesomeIcon icon="fa-solid fa-user" />*/}
                    {isLogin ? (
                        <div className={"user-icon-group"}>
                            <span className={"user-icon-popup"}>
                                <FontAwesomeIcon
                                    style={{fontSize: "1.5em", color: "#0df5e3"}}
                                    icon={faUser}
                                />
                                <div className={"user-icon-popup-container"}>
                                   {user && (
                                       <div className={"user-icon-popup-section"}>
                                           <img src={user.avatar} alt=""/>
                                           <span>{user.full_name}</span>
                                           <p>{user.email}</p>
                                           <Link id={"change-pass-btn"} to={'/change-password'}>تغییر رمز عبور</Link>
                                       </div>
                                   )}
                                </div>
                            </span>
                            <FontAwesomeIcon
                                onClick={logoutHandler}
                                style={{fontSize: "1.5em", color: "#d82828", cursor: "pointer"}}
                                icon={faRightFromBracket}
                            />
                        </div>
                    ) : (<Link className="button-34" to={"/login"}>ورود / ثبت نام</Link>)}
                </div>
            </div>
        </nav>
    )
}