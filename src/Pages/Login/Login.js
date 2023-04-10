import "../../Styles/login.css"
import {useForm} from "../../Hooks/useForm";
import Input from "../../Components/Form/Input";
import {emailValidator, maxValidator, minValidator, requiredValidator} from "../../Validators/rules";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {Link, useSearchParams} from "react-router-dom";
import Button from "../../Components/Form/Button";
import notification from "../../Utils/Toastify";
import {useNavigate} from 'react-router-dom';
import {useContext, useEffect} from "react";
import UserContext from "../../Context/Context";


export default function Login() {
    const [formState, onInputHandler] = useForm(
        {
            email: {
                value: "",
                isValid: false,
            },
            password: {
                value: "",
                isValid: false,
            },
        },
        false
    );
    const [searchParams, setSearchParams] = useSearchParams();
    const [user, setUser, isLogin, setIsLogin] = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (isLogin) {
            if (searchParams.get("next")) {
                navigate(searchParams.get("next"))
            } else {
                navigate('/');
            }
        }
    }, [isLogin])
    const userLogin = (event) => {
        event.preventDefault();
        let userInfo = {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
        }
        fetch("http://127.0.0.1:8000/accounts/api/v1/jwt/create/", {
            method: "POST",
            body: JSON.stringify(userInfo),
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                notification("اطالاعات وارد شده صحیح نمیباشد", "error")
            }
        }).then(res => {
            localStorage.setItem('accessToken', res.access)
            localStorage.setItem('refreshToken', res.refresh)
            notification("شما با موفقیت لاگین شدید", "success")
            // setUser({
            //     user: null,
            //     isLogin: true
            // })
            setIsLogin(true)
            if (searchParams.get("next")) {
                navigate(searchParams.get("next"))
            } else {
                navigate('/');
            }
        })

        // localStorage.getItem('itemName')

    };

    return (
        <div className="login-main">
            <section className="login-container">
                <div className="login-section">
                    <div className="login-right">
                        <h1 className="login-header">فرم ورود</h1>
                        <form action="#">
                            <div className="form-group">
                                {/*<input type="text" placeholder="Email"/>*/}
                                <Input
                                    // className="login-form__username-input"
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    element="input"
                                    validations={[
                                        requiredValidator(),
                                        // minValidator(8),
                                        // maxValidator(20),
                                        emailValidator()
                                    ]}
                                    onInputHandler={onInputHandler}
                                />
                                <FontAwesomeIcon icon={faEnvelope}/>
                                {/*<i className="fa fa-envelope"></i>*/}
                            </div>
                            <div className="form-group">
                                {/*<input type="password" placeholder="Password"/>*/}
                                <Input
                                    // className="login-form__username-input"
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    element="input"
                                    validations={[
                                        requiredValidator(),
                                        minValidator(8),
                                        // maxValidator(20),
                                        emailValidator()
                                    ]}
                                    onInputHandler={onInputHandler}
                                />
                                {/*<i className="fa fa-lock"></i>*/}
                                <FontAwesomeIcon icon={faLock}/>
                            </div>
                            {/*<button onClick={(event) => userLogin(event)} type="submit">ورود</button>*/}
                            <Button
                                className={`${formState.isFormValid ? "login-form-success" : "login-form-error"}`}
                                type="submit"
                                onClick={userLogin}
                                disabled={!formState.isFormValid}
                            >
                                ورود
                            </Button>
                        </form>
                        <p>اگر اکانت ندارد از اینجا <Link to={"/register"}>ثبت نام</Link> کنید</p>
                    </div>
                    <div className="login-left">
                        <img src="./images/ezgif.com-webp-to-jpg(2).jpg" alt="xd"/>
                    </div>
                </div>
            </section>
        </div>
    )
}