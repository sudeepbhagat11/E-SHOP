import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
// import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from 'react-redux';
import store from './store';
import './assets/styles/bootstrap.custom.css';

import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Homescreen from './screens/homescreen';  
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/cartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PrivalteRoute from './components/PrivalteRoute';
import PaymentScreen from './screens/PaymentScreen';
import { PlaceOrderScreen } from './screens/PlaceOrderScreen';
import { OrderScreen } from './screens/OrderScreen';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = "/" element = {<App />}>
      <Route index = {true} path = "/" element  = {<Homescreen />} />
      <Route  path = '/product/:id' element  = {<ProductScreen />} />
      <Route  path = '/cart' element  = {<CartScreen />} />
      <Route path = '/login' element = {<LoginScreen />} />
      <Route path = '/register' element = {<RegisterScreen />} />
      
      <Route path = '' element = {<PrivalteRoute />}>
        <Route path = '/shipping' element = {<ShippingScreen />} />
        <Route path = '/payment' element = {<PaymentScreen />} />
        <Route path = '/placeOrder' element = {<PlaceOrderScreen />} />
        
        <Route path = '/order/:id' element = {<OrderScreen />} />
      </Route>
    </Route>
  )

)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store = {store}>
  <PayPalScriptProvider deferLoading={true}>
  <RouterProvider router = {router} />
  </PayPalScriptProvider>
  </Provider>
    
  </React.StrictMode>
);


reportWebVitals();
