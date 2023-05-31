import { Navigate, useRoutes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import DashboardAppPage from './pages/DashboardAppPage';
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';

// Product
import ProductsPage from './pages/ProductsPage';
import ProductAdd from './pages/ProductAdd';
import ProductEdit from './pages/ProductEdit';
import ProductDetail from './pages/ProductDetail';

// Center
import CenterPage from "./pages/center/CentersPage";
import OwnerCenterPage from "./pages/center/OwnerCenterPage";
import AddCenter from "./components/centers/AddCenter";

// User
import UserPage from './pages/UserPage';
import EditUserPage from './pages/EditUserPage'
import InfoUserPage from './pages/InfoUserPage'
import EditCenter from "./components/centers/EditCenter";
import InfoCenter from "./components/centers/InfoCenter";

// Role
import AdminPrivateRoute from "./hoc/AdminPrivateRoute";
import OwnerPrivateRoute from './hoc/OwnerPrivateRoute';


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
      element: isLogin ? <DashboardLayout /> : <Navigate to='/login' />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        
        { path: 'app', element: <DashboardAppPage /> },

        { path: 'user', element: <UserPage /> },

        { path: 'user/edit/:userId', element: <EditUserPage /> },

        { path: 'user/info/:userId', element: <InfoUserPage /> },

        { path: 'products', element: <ProductsPage /> },

        { path: 'products/edit/:id',element: <ProductEdit />},

        { path: 'products/detail/:id', element: <ProductDetail /> },

        { path: 'products/add', element: <ProductAdd /> },

        { path: 'centers',element: <CenterPage/>},

        { path: 'centers/edit/:id',element: <EditCenter/>},

        { path: "centers/new", element:<AddCenter/>},

        { path: 'products/add', element: <ProductAdd /> },

        { path: 'centers', element: <AdminPrivateRoute roleName="ROLE_ADMIN" />, children: [
          { path: '', element: <CenterPage /> },
          { path: 'info/:centerId', element: <InfoCenter /> },
        ]},
        { path: 'centers/owner', element: <OwnerPrivateRoute roleName="ROLE_OWNER" />, children: [
          { path: '', element: <OwnerCenterPage /> },
          { path: 'add', element: <AddCenter /> },
          { path: 'edit/:centerId', element: <EditCenter /> },
        ]},

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
