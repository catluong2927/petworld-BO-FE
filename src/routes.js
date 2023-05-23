import { Navigate, useRoutes } from 'react-router-dom';
import {useSelector} from "react-redux";
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import CenterPage from "./pages/CentersPage";
import {AddCenter} from "./components/centers/AddCenter";
import EditUserPage from './pages/EditUserPage'
import ProductAdd from './pages/ProductAdd';  
import InfoUserPage from './pages/InfoUserPage'
import {EditCenter} from "./components/centers/EditCenter";



// ----------------------------------------------------------------------

export default function Router() {
  const isLogin = useSelector((state) => state.auth.login?.currentUser);
  const routes = useRoutes([
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '/dashboard',
      element: isLogin? <DashboardLayout /> : <Navigate to='/login' />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage />},
        { path: 'user/edit/:userId', element: <EditUserPage /> },
        { path: 'user/info/:userId', element: <InfoUserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'centers',element: <CenterPage/>},
        { path: 'centers/edit/:id',element: <EditCenter/>},
        {path: "centers/new", element:<AddCenter/>},
        { path: 'products/add', element: <ProductAdd /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
