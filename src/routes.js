import { Navigate, useRoutes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import DashboardAppPage from './pages/DashboardAppPage';
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
import EditCenter from "./components/centers/EditCenter";
import InfoCenter from "./components/centers/InfoCenter";

// Package
import PackagePage from './pages/package/PackagePage';
import PackageDetailPage from "./pages/package/PackageDetailPage";
import InfoPackage from "./components/package/InfoPackage";

// User
import UserPage from './pages/UserPage';
import EditUserPage from './pages/EditUserPage'
import InfoUserPage from './pages/InfoUserPage'

// Role
import AdminPrivateRoute from "./hoc/AdminPrivateRoute";
import OwnerPrivateRoute from './hoc/OwnerPrivateRoute';
import CustomerPrivateRoute from './hoc/CustomerPrivateRoute';

export default function Router() {
  const isLogin = useSelector((state) => state.auth.login?.currentUser);

  const routes = useRoutes([
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '/dashboard',
      element: <CustomerPrivateRoute/>,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },

        { path: 'app', element: <DashboardAppPage /> },

        // Admin
        {
          path: 'admin',
          element: <AdminPrivateRoute roleName="ROLE_ADMIN" />,
          children: [
            {
              path: 'user',
              children: [
                { path: '', element: <UserPage /> },
                { path: 'edit/:userId', element: <EditUserPage /> },
                { path: 'info/:userId', element: <InfoUserPage /> },
              ],
            },
            {
              path: 'centers',
              children: [
                { path: '', element: <CenterPage /> },
                { path: 'info/:centerId', element: <InfoCenter /> },
              ],
            },
            {
              path: 'products',
              children: [
                { path: '', element: <ProductsPage /> },
                { path: 'add', element: <ProductAdd /> },
                { path: 'edit/:id', element: <ProductEdit /> },
                { path: 'detail/:id', element: <ProductDetail /> },
              ]
            },
            {
              path: 'packages', children: [
                { path: '', element: <PackagePage /> },
                { path: 'info/:packageId', element: <InfoPackage /> },
              ],
            },
          ],
        },

        // Owner
        {
          path: 'owner',
          element: <OwnerPrivateRoute roleName="ROLE_OWNER" />,
          children: [
            {
              path: 'centers',
              children: [
                { path: '', element: <OwnerCenterPage /> },
                { path: 'add', element: <AddCenter /> },
                { path: 'edit/:centerId', element: <EditCenter /> },
              ],
            },
            { path: 'products/add', element: <ProductAdd /> },
            {
              path: 'packages', children: [
                { path: '', element: <PackageDetailPage /> },
                { path: 'info/:packageId', element: <InfoPackage /> },
              ],
            },
          ],
        },

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
