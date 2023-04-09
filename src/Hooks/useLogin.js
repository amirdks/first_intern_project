import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export const useLogin = (user, setUser, isLogin, setIsLogin) => {
    useEffect(() => {
        let accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            fetch("http://127.0.0.1:8000/accounts/api/v1/jwt/verify/", {
                method: "POST",
                body: JSON.stringify({token: accessToken}),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => {
                if (res.status === 200) {
                    fetch("http://127.0.0.1:8000/accounts/api/v1/user/profile/", {
                        method: "GET",
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    }).then(res => {
                        if (res.status === 200) {
                            return res.json()
                        } else {
                            throw new Error("شناسایی نشد")
                        }
                    }).then(res => {
                        // setUser(prevState => {
                        //     return {user: res, isLogin: true}
                        // });
                        setUser(res)
                        setIsLogin(true)
                    }).catch(error => {
                    })

                } else {
                    throw new Error("توکن معتبر نمیباشد")
                }
            }).catch(error => {
                let refreshToken = localStorage.getItem('refreshToken');
                if (refreshToken) {
                    fetch("http://127.0.0.1:8000/accounts/api/v1/jwt/refresh/", {
                        method: "POST",
                        body: JSON.stringify({refresh: refreshToken}),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(res => {
                        if (res.status === 200) {
                            return res.json()
                        } else {
                            throw new Error("شما باید دوباره لاگین کنید")
                        }
                    }).then(res => {
                        localStorage.setItem('accessToken', res.access)
                        setIsLogin(true)
                    }).catch(error => {
                        // navigate("/login")
                        setIsLogin(false)
                    })
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }, [isLogin])
};
