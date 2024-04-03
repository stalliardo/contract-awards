import './App.css';
import Auth from './components/auth/Auth';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";


import Root from './routes/root';
import AwardsSummary from './components/awards/awards-summary/AwardsSummary';
import DevPage from './components/developer/DevPage';
import TendersSubmitted from './routes/TendersSubmitted';
import Admin from './routes/Admin';

import Navbar from './components/navbar/Navbar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './redux/features/users/usersThunk';

const AppLayout = () => (
  <>
    <Navbar  />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
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
        path: "/awards-summary", // <- TODO
        element: <AwardsSummary />
      },
      {
        path: "/dev", // <- TODO
        element: <DevPage />
      }
    ]
  },
  
]);

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    // Only want this to be called once

    // check if the users has data from the store

    console.log('user.data.length = ', users.data.length);

    if(users.data.length) {
      // dont call the api
    } else {
      dispatch(fetchUsers());
    }

    console.log('%capp effect called, getting AD data from backend...', "color: red");

  }, [])

  return (
   <RouterProvider router={router}/>
  );
}

export default App;

// dispatch an event from the membersSlice
// This will call the AD API, get all the users in the CA01, CA02 and CA03 groups
