import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInstagram, faTelegram, faTwitter, faWhatsapp} from "@fortawesome/free-brands-svg-icons";
import {Link} from "react-router-dom";

export default function Header() {
    return (
        <div className="header-container">
            <div className="header-section">
                <div className="header-header">
                    بهترین سایت برای جست و جو بین دیتا های
                </div>
                <div className="header-social">
                    <div>
                        {/*<i className="fa-brands fa-instagram icon"></i>*/}
                        <FontAwesomeIcon icon={faInstagram} className={"icon"} />
                    </div>
                    <div>
                        {/*<i className="fa-brands fa-twitter icon"></i>*/}
                        <FontAwesomeIcon icon={faTwitter} className={"icon"} />
                    </div>
                    <div>
                        {/*<i className="fa-brands fa-telegram icon"></i>*/}
                        <FontAwesomeIcon icon={faTelegram} className={"icon"} />
                    </div>
                    <div>
                        {/*<i className="fa-brands fa-whatsapp icon"></i>*/}
                        <FontAwesomeIcon icon={faWhatsapp} className={"icon"} />
                    </div>
                </div>
                <div className="header-text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aut autem distinctio dolorum
                    ducimus
                    eaque eius error expedita incidunt laudantium magni maxime modi placeat, provident quisquam quod
                    similique sint sunt.
                </div>
                <div className="header-search-button">
                    {/*<i className="fa-solid fa-magnifying-glass"></i>*/}
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <Link to={"/search"}>جست و جو را شروع کنید</Link>
                </div>
            </div>
        </div>
    )
}