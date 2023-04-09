import Index from "./Pages/Index/Index";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import SearchPage from "./Pages/SearchPage/SearchPage";
import SearchResult from "./Pages/SearchResult/SearchResult";
import CreateNewProduct from "./Pages/CreateNewProduct/CreateNewProduct";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

const routes = [
    {path: '/', element: <Index/>},
    {path: '/Login', element: <Login/>},
    {path: '/register', element: <Register/>},
    // {path: '/search', element: <SearchPage/>},
    // {path: '/search-results', element: <SearchResult/>},
    // {path: '/new-product', element: <CreateNewProduct/>},
    {
        path: '/*', element: <PrivateRoute/>, children: [
            {path: 'search', element: <SearchPage/>},
            {path: 'search-results', element: <SearchResult/>},
            {path: 'new-product', element: <CreateNewProduct/>},
        ]
    },
]
export default routes