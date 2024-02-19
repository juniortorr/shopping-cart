import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './assets/components/App.jsx';
import './index.css';
import Product, { loader as productLoader } from './assets/components/Product.jsx';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="product/:productId" element={<Product />} loader={productLoader}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
