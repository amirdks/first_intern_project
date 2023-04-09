import "../../Styles/login.css"
import {useForm} from "../../Hooks/useForm";
import Input from "../../Components/Form/Input";
import {emailValidator, requiredValidator} from "../../Validators/rules";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import Button from "../../Components/Form/Button";

export default function Register() {
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
    const userRegister = (event) => {
        event.preventDefault();
        console.log("User Login");
    };

    return (
        <div className="login-main">
            <section className="login-container">
                <div className="login-section">
                    <div className="login-right">
                        <h1 className="login-header">فرم ثبت نام</h1>
                        <form action="#">
                            <div className="form-group">
                                <Input
                                    // className="login-form__username-input"
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    element="input"
                                    validations={[
                                        requiredValidator(),
                                        // maxValidator(20),
                                        emailValidator()
                                    ]}
                                    onInputHandler={onInputHandler}
                                />
                                <FontAwesomeIcon icon={faEnvelope}/>
                            </div>
                            <div className="form-group">
                                <Input
                                    // className="login-form__username-input"
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    element="input"
                                    validations={[
                                        requiredValidator(),
                                        // maxValidator(20),
                                        emailValidator()
                                    ]}
                                    onInputHandler={onInputHandler}
                                />
                                {/*<i className="fa fa-lock"></i>*/}
                                <FontAwesomeIcon icon={faLock}/>
                            </div>
                            <div className="form-group">
                                <Input
                                    // className="login-form__username-input"
                                    id="password1"
                                    type="password"
                                    placeholder="Repeat Password"
                                    element="input"
                                    validations={[
                                        requiredValidator(),
                                        // minValidator(8),
                                        // maxValidator(20),
                                        emailValidator()
                                    ]}
                                    onInputHandler={onInputHandler}
                                />
                                {/*<i className="fa fa-lock"></i>*/}
                                <FontAwesomeIcon icon={faLock}/>
                            </div>
                            <Button
                                className={`${formState.isFormValid ? "login-form-success" : "login-form-error"}`}
                                type="submit"
                                onClick={userRegister}
                                disabled={!formState.isFormValid}
                            >
                                ثبت نام
                            </Button>
                        </form>
                        <p>اگر اکانت دارید از اینجا <Link to={"/login"}>لاگین</Link> کنید</p>
                    </div>
                    <div className="login-left">
                        <img src="./images/ezgif.com-webp-to-jpg(2).jpg" alt="xd"/>
                    </div>
                </div>
            </section>
        </div>
    )
}