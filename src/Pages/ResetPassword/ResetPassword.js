import Input from "../../Components/Form/Input";
import {emailValidator, minValidator, requiredValidator} from "../../Validators/rules";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons";
import Button from "../../Components/Form/Button";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import "../../Styles/login.css"
import {useForm} from "../../Hooks/useForm";
import notification from "../../Utils/Toastify";
import {useEffect, useState} from "react";

export default function ResetPassword() {
    const [formState, onInputHandler] = useForm(
        {
            password: {
                value: "",
                isValid: false,
            },
        },
        false
    );
    const [searchParams, setSearchParams] = useSearchParams();
    const [token, setToken] = useState(searchParams.get("token"))
    const navigate = useNavigate();
    useEffect(() => {
        if (searchParams.has("token")) {
            fetch("http://127.0.0.1:8000/accounts/api/v1/reset-password/validate-token/", {
                body: JSON.stringify({token: token}),
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => {
                if (res.status !== 200) {
                    notification("توکن بازیابی دیگر معتبر نمیباشد لطفا بار دیگر تلاش کنید", "error")
                    navigate("/forget-password")
                    throw new Error("توکن بازیابی دیگر معتبر نمیباشد لطفا بار دیگر تلاش کنید")
                }
            }).catch(error => {
                return
            })
        }
    }, [])
    const resetPasswordHandler = (event) => {
        event.preventDefault()
        let body = {
            token: token,
            password: formState.inputs.password.value,
            password1: formState.inputs.password.value
        }
        fetch("http://127.0.0.1:8000/accounts/api/v1/reset-password/set-password/", {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.status === 200) {
                navigate("/login")
                notification("رمز عبور شما با موفقیت تغییر کرد حالا میتوانید دوباره وارد شوید", "success")
            } else {
                notification("توکن بازیابی دیگر معتبر نمیباشد لطفا بار دیگر تلاش کنید", "error")
                navigate("/forget-password")
                throw new Error("توکن بازیابی دیگر معتبر نمیباشد لطفا بار دیگر تلاش کنید")
            }
        }).catch(error => {
            return
        })
    }
    return (
        <>
            <div className="login-main">
                <section className="login-container">
                    <div className="login-section">
                        <div className="login-right">
                            <h1 className="login-header">بازیابی رمز عبور</h1>
                            <form action="#">
                                <div className="form-group">
                                    {/*<input type="text" placeholder="Email"/>*/}
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
                                            // emailValidator()
                                        ]}
                                        onInputHandler={onInputHandler}
                                    />
                                    {/*<i className="fa fa-lock"></i>*/}
                                    <FontAwesomeIcon icon={faLock}/>
                                    {/*<i className="fa fa-envelope"></i>*/}
                                </div>
                                {/*<button onClick={(event) => userLogin(event)} type="submit">ورود</button>*/}
                                <Button
                                    className={`${formState.isFormValid ? "login-form-success" : "login-form-error"}`}
                                    type="submit"
                                    onClick={resetPasswordHandler}
                                    disabled={!formState.isFormValid}
                                >
                                    بازیابی
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
        </>
    )
}