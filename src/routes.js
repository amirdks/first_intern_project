import Index from "./Pages/Index/Index";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import SearchPage from "./Pages/SearchPage/SearchPage";
import SearchResult from "./Pages/SearchResult/SearchResult";
import CreateNewProduct from "./Pages/CreateNewProduct/CreateNewProduct";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import Error404 from "./Pages/Error404/Error404";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";

const routes = [
    {path: '/', element: <Index/>},
    {path: '/Login', element: <Login/>},
    {path: '/register', element: <Register/>},
    {path: '/forget-password', element: <ForgetPassword/>},
    {path: '/reset-password', element: <ResetPassword/>},
    // {path: '/search', element: <SearchPage/>},
    // {path: '/search-results', element: <SearchResult/>},
    // {path: '/new-product', element: <CreateNewProduct/>},
    {
        path: '/*', element: <PrivateRoute/>, children: [
            {path: 'search', element: <SearchPage/>},
            {path: 'search-results', element: <SearchResult/>},
            {path: 'new-product', element: <CreateNewProduct/>},
            {path: 'change-password', element: <ChangePassword/>},
        ]
    },
    {path: "/*", element: <Error404/>}
]
export default routes