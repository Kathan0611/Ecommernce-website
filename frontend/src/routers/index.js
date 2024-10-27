import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import AdminPanel from '../pages/AdminPanel';
import AllUsers from '../pages/AllUsers';
import AllProducts from '../pages/AllProducts';
import CategoryProduct from '../pages/CategoryProduct';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import SearchProduct from '../pages/SearchProduct';
import OrderPage from '../pages/OrderPage';
import Success from '../pages/Success';
import Cancel from '../pages/Cancel';

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