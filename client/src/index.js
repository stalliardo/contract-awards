import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/root';
import Auth from './components/auth/Auth';
import AwardsSummary from './components/awards/AwardsSummary';
import Navbar from './components/navbar/Navbar';
import DevPage from './components/developer/DevPage';
import TendersSubmitted from './routes/TendersSubmitted';
import Admin from './routes/Admin';

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './redux/reducers/';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/auth",
    element: <Auth />
  },
  {
    path: "/awards-form", // <- TODO
    element: <Root />
  },
  {
    path: "/tenders-submitted", // <- TODO
    element: <TendersSubmitted />
  },
  {
    path: "/admin", // <- TODO
    element: <Admin />
  },
  {
    path: "/awards-totals", // <- TODO
    element: <AwardsSummary />
  },
  {
    path: "/dev", // <- TODO
    element: <DevPage />
  }
]);

const store = configureStore({
  reducer: rootReducer
})


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* Is the below line okay to go here? */}
      <Navbar />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
