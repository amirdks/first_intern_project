import "./CreateNewProduct.css"
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Input from "../../Components/Form/Input";
import {emailValidator, requiredValidator} from "../../Validators/rules";
import {useForm} from "../../Hooks/useForm";
import Button from "../../Components/Form/Button";
import {useEffect, useState} from "react";
import notification from "../../Utils/Toastify"
export default function CreateNewProduct() {
    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])
    const [currentBrand, setCurrentBrand] = useState("")
    const [currentCategory, setCurrentCategory] = useState("")
    const [selectedImage, setSelectedImage] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [formState, onInputHandler] = useForm(
        {
            title: {
                value: "",
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
            price: {
                value: "",
                isValid: false,
            },
            quantity: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    useEffect(() => {
        fetch("http://127.0.0.1:8000/products/api/v1/product-brands/")
            .then(res => res.json())
            .then(res => {
                setBrands(res)
                setCurrentBrand(res[0].id)
            })
        fetch("http://127.0.0.1:8000/products/api/v1/product-categories/")
            .then(res => res.json())
            .then(res => {
                setCategories(res)
                setCurrentCategory(res[0].id)
            })
    }, [])
    const createProduct = (event) => {
        event.preventDefault()
        let newProduct = {
            title: formState.inputs.title.value,
            price: formState.inputs.price.value,
            quantity: formState.inputs.quantity.value,
            description: formState.inputs.description.value,
            brand: currentBrand,
            category: currentCategory,
            is_active: isActive,
        }
        const formData = new FormData();
        formData.append("image", selectedImage);
        for (let key in newProduct) {
            formData.append(key, newProduct[key]);
        }
        fetch("http://127.0.0.1:8000/products/api/v1/products/", {
            method: "POST",
            body: formData,
            // headers: {"Content-type": "application/json; charset=UTF-8"}
        }).then(res => {
            if (res.status === 201){

                return res.json()
            }else {
                throw new Error("اطلاعات وارد شده صحیح نیست");
            }
                })
            .then(res => {
                notification("محصول جدید با موفقیت در سایت قرار گرفت", "success")
            })
    }
    const onBrandChange = (event) => {
        setCurrentBrand(event.target.value)
    }
    const onCategoryChange = (event) => {
        setCurrentCategory(event.target.value)
    }
    return (
        <>
            <Navbar/>
            <div className="create-main">
                <div className="create-container">
                    <div className="create-section">
                        <div className="create-header">قراردادن محصول جدید</div>
                        <form action="#" className="create-form">
                            <div className="create-input-group">
                                <label htmlFor="">عنوان محصول</label>
                                <Input
                                    // className="login-form__username-input"
                                    id="title"
                                    type="text"
                                    placeholder="عنوان ..."
                                    element="input"
                                    validations={[
                                        requiredValidator(),
                                        // minValidator(8),
                                        // maxValidator(20),
                                        // emailValidator()
                                    ]}
                                    onInputHandler={onInputHandler}
                                />
                            </div>
                            <div className="create-input-group">
                                <label htmlFor="">توضیحات محصول</label>
                                <Input
                                    // className="login-form__username-input"
                                    id="description"
                                    type="text"
                                    placeholder="توضیحات ..."
                                    element="input"
                                    validations={[
                                        requiredValidator(),
                                        // minValidator(8),
                                        // maxValidator(20),
                                        // emailValidator()
                                    ]}
                                    onInputHandler={onInputHandler}
                                />
                            </div>
                            <div className="create-input-group">
                                <label htmlFor="">عکس محصول</label>
                                <input onChange={(event) => setSelectedImage(event.target.files[0])} type="file"/>
                            </div>
                            <div className="create-input-group">
                                <label htmlFor="">برند محصول</label>
                                <select value={currentBrand} onChange={(event) => onBrandChange(event)} name="brand"
                                        id="brand">
                                    {brands.map(brand => (
                                        <option key={brand.id} value={brand.id}>{brand.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="create-input-group">
                                <label htmlFor="">کتگوری محصول</label>
                                <select value={currentBrand} onChange={(event) => onCategoryChange(event)}
                                        name="category"
                                        id="category">
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="create-input-group">
                                <label htmlFor="">قیمت محصول</label>
                                <Input
                                    // className="login-form__username-input"
                                    id="price"
                                    type="text"
                                    placeholder="قیمت ..."
                                    element="input"
                                    validations={[
                                        requiredValidator(),
                                        // minValidator(8),
                                        // maxValidator(20),
                                        // emailValidator()
                                    ]}
                                    onInputHandler={onInputHandler}
                                />
                            </div>
                            <div className="create-input-group">
                                <label htmlFor="">موجودی محصول</label>
                                <Input
                                    // className="login-form__username-input"
                                    id="quantity"
                                    type="number"
                                    placeholder="موجودی ..."
                                    element="input"
                                    validations={[
                                        requiredValidator(),
                                        // minValidator(8),
                                        // maxValidator(20),
                                        // emailValidator()
                                    ]}
                                    onInputHandler={onInputHandler}
                                />
                            </div>
                            <div className="create-input-group">
                                <label htmlFor="">فعال / غیرفعال</label>
                                <input value={isActive} onChange={(event) => setIsActive(event.target.checked)}
                                       type="checkbox" id={"is-active"}/>
                            </div>
                            <Button
                                className={`${formState.isFormValid ? "create-form-success" : "create-form-error"}`}
                                type="submit"
                                onClick={createProduct}
                                disabled={!formState.isFormValid}
                            >
                                ثبت اطلاعات
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}