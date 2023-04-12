import Input from "../../Components/Form/Input";
import {emailValidator, minValidator, requiredValidator} from "../../Validators/rules";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons";
import Button from "../../Components/Form/Button";
import {Link} from "react-router-dom";
import "../../Styles/login.css"
import {useForm} from "../../Hooks/useForm";
import notification from "../../Utils/Toastify";

export default function ForgetPassword() {
    const [formState, onInputHandler] = useForm(
        {
            email: {
                value: "",
                isValid: false,
            },
        },
        false
    );
    const forgetPasswordHandler = (event) => {
        event.preventDefault()
        let body = {
            email: formState.inputs.email.value
        }
        fetch("http://127.0.0.1:8000/accounts/api/v1/reset-password/", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if(res.status === 200){
                return res.json()
            }else {
                notification("کاربری با ایمیل ارسال شده یافت نشد", "error")
                throw new Error("کاربری با ایمیل ارسال شده یافت نشد")
            }
        }).then(res => {
            notification("یک ایمیل حاوی لینک بازیابی به شما ارسال شد", "success")
        }).catch(error=>{
            return
        })
    }
    return (
        <>
            <div className="login-main">
                <section className="login-container">
                    <div className="login-section">
                        <div className="login-right">
                            <h1 className="login-header">فراموشی رمز عبور</h1>
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
                                {/*<button onClick={(event) => userLogin(event)} type="submit">ورود</button>*/}
                                <Button
                                    className={`${formState.isFormValid ? "login-form-success" : "login-form-error"}`}
                                    type="submit"
                                    onClick={forgetPasswordHandler}
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
        </>
    )
}