import {useForm} from "../../Hooks/useForm";
import notification from "../../Utils/Toastify";
import Input from "../../Components/Form/Input";
import {emailValidator, minValidator, requiredValidator} from "../../Validators/rules";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons";
import Button from "../../Components/Form/Button";
import {Link, useNavigate} from "react-router-dom";

export default function ChangePassword() {
    const [formState, onInputHandler] = useForm(
        {
            old_password: {
                value: "",
                isValid: false,
            },
            new_password: {
                value: "",
                isValid: false,
            },
        },
        false
    );
    const navigate = useNavigate()
    const changePasswordHandler = (event) => {
        event.preventDefault()
        let body = {
            old_password: formState.inputs.old_password.value,
            new_password: formState.inputs.new_password.value,
            new_password1: formState.inputs.new_password.value,
        }
        let accessToken = localStorage.getItem('accessToken');
        fetch("http://127.0.0.1:8000/accounts/api/v1/change-password/", {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => {
            if (res.status === 200) {
                notification("رمز عبور شما با موفقیت تغییر یافت", "success");
                navigate("/")
            }else if(res.status === 400){
                notification("رمز عبور قبلی شما اشتباه است", "error");
            }else if(res.status===403){
                notification("برای اینکار ابتدا باید لاگین کنید", "error");
            }
        })
    }
    return (
        <>
            <div className="login-main">
                <section className="login-container">
                    <div className="login-section">
                        <div className="login-right">
                            <h1 className="login-header">تغییر رمز عبور</h1>
                            <form action="#">
                                <div className="form-group">
                                    <Input
                                        // className="login-form__username-input"
                                        id="old_password"
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
                                </div>
                                <div className="form-group">
                                    <Input
                                        // className="login-form__username-input"
                                        id="new_password"
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
                                </div>
                                {/*<button onClick={(event) => userLogin(event)} type="submit">ورود</button>*/}
                                <Button
                                    className={`${formState.isFormValid ? "login-form-success" : "login-form-error"}`}
                                    type="submit"
                                    onClick={changePasswordHandler}
                                    disabled={!formState.isFormValid}
                                >
                                    ارسال
                                </Button>
                            </form>
                            <p>اگر رمز خود را فراموش کردید از اینجا <Link to={"/forget-password"}>بازیابی</Link> کنید</p>
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