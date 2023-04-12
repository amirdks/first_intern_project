import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

export default function SearchBox({search, onSearchChange}) {
    return (
        <div className="main-search-container">
            <h1 className="main-search-header">
                داده ای که دنبالش هستید را وارد کنید :
            </h1>
            <div className="main-search-group">
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
                <input onChange={(event) => onSearchChange(event.target.value)} value={search} id="search-input"
                       type="text" placeholder="جست و جو ..."/>
            </div>
        </div>
    )
}