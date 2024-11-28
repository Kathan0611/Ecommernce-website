import { lazy } from 'react';
import {createBrowserRouter} from 'react-router-dom'
// import App from '../App'
// import Home from '../pages/Home';
// import Login from '../pages/Login';
// import Signup from '../pages/Signup';
// import AdminPanel from '../pages/AdminPanel';
// import AllUsers from '../pages/AllUsers';
// import AllProducts from '../pages/AllProducts';
// import CategoryProduct from '../pages/CategoryProduct';
// import ProductDetails from '../pages/ProductDetails';
// import Cart from '../pages/Cart';
// import SearchProduct from '../pages/SearchProduct';
// import OrderPage from '../pages/OrderPage';
// import Success from '../pages/Success';
// import Cancel from '../pages/Cancel';
// import  ForgotPassword  from '../pages/ForgotPassword';
// import ResetPassword from '../pages/ResetPassword';

const App = lazy(() => import('../App'));
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));
const AdminPanel = lazy(() => import('../pages/AdminPanel'));
const AllUsers = lazy(() => import('../pages/AllUsers'));
const AllProducts = lazy(() => import('../pages/AllProducts'));
const CategoryProduct = lazy(() => import('../pages/CategoryProduct'));
const ProductDetails = lazy(() => import('../pages/ProductDetails'));
const Cart = lazy(() => import('../pages/Cart'));
const SearchProduct = lazy(() => import('../pages/SearchProduct'));
const OrderPage = lazy(() => import('../pages/OrderPage'));
const Success = lazy(() => import('../pages/Success'));
const Cancel = lazy(() => import('../pages/Cancel'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/ResetPassword'));

const routers= createBrowserRouter([{
    path:"/",
    element:<App/>,
    children:[
    {
        path:"/",
        element:<Home/>
    },
    {
        path:'login',
        element:<Login/>
    },
    {
        path:'Signup',
        element:<Signup/>
    },
    {
        path:'forgot-password',
        element:<ForgotPassword/>
    },
    {
       path:'reset-password',
       element:<ResetPassword/>
    },
    {
        path:'userDetails',
        element:<Home/>
    },
    {
       path:'product-category',
       element:<CategoryProduct/>
    },
    {
       path:'product/:id',
       element:<ProductDetails/>
    },
    {
        path : 'cart',
        element : <Cart/>
    },
     {
        path:'search',
        element:<SearchProduct/>
     },
     {
        path:'order',
        element:<OrderPage/>
     },
     {
        path:'success',
        element:<Success/>
     },
     {
        path:'cancel',
        element:<Cancel/>
     },
    {
       path:'admin-panel',
       element:<AdminPanel/>,
       children:[{
         path:"all-users",
         element:<AllUsers/>
       },{
          path:"all-products",
          element:<AllProducts/>
       }
    ]
    },
    ]
}])

export default routers;