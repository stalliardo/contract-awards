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

  return (
   <RouterProvider router={router}/>
  );
}

export default App;
