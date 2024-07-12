import './App.css';
import Auth from './components/auth/Auth';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from './routes/root';
import AwardsSummary from './components/awards/awards-summary/AwardsSummary';
import DevPage from './components/developer/DevPage';
import TendersSubmitted from './routes/TendersSubmitted';
import Admin from './routes/Admin';
import AppEntryPoint from './routes/AppEntryPoint';

const router = createBrowserRouter([
  {
    element: <AppEntryPoint />,
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
        path: "/awards-form",
        element: <Root />
      },
      {
        path: "/tenders-submitted",
        element: <TendersSubmitted />
      },
      {
        path: "/admin",
        element: <Admin />
      },
      {
        path: "/awards-summary",
        element: <AwardsSummary />
      },
      {
        path: "/site-admin",
        element: <DevPage />
      },
    ]
  },
]);

function App() {
  return (
   <RouterProvider router={router}/>
  );
}

export default App;