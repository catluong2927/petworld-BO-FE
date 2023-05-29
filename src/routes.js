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

// Center
import CenterPage from "./pages/center/CentersPage";
import OwnerCenterPage from "./pages/center/OwnerCenterPage";
import AddCenter from "./components/centers/AddCenter";
import EditCenter from "./components/centers/EditCenter";
import InfoCenter from "./components/centers/InfoCenter";

// Package
import PackagePage from './pages/package/PackagePage';
import SellerPackageDetailPage from "./pages/package/SellerPackageDetailPage";
import InfoPackage from "./components/package/InfoPackage";

// User
import UserPage from './pages/UserPage';
import EditUserPage from './pages/EditUserPage'
import InfoUserPage from './pages/InfoUserPage'

// Role
import AdminPrivateRoute from "./hoc/AdminPrivateRoute";
import OwnerPrivateRoute from './hoc/OwnerPrivateRoute';
import SellerPrivateRoute from './hoc/SellerPrivateRoute';
import PrivateRoute from './hoc/PrivateRoute';


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
        { path: 'products/add', element: <ProductAdd /> },


        // { path: 'centers', element: <AdminPrivateRoute roleName="ROLE_ADMIN" />, children: [
        //   { path: '', element: <CenterPage /> },
        //   { path: 'info/:centerId', element: <InfoCenter /> },
        // ]},
        // { path: 'package', element: <AdminPrivateRoute roleName="ROLE_ADMIN" />, children: [
        //   { path: '', element: <PackagePage /> },
        //   { path: 'info/:packageId', element: <InfoPackage /> },
        // ]},
        // { path: 'centers', element: <OwnerPrivateRoute roleName="ROLE_OWNER" />, children: [
        //   { path: '', element: <OwnerCenterPage /> },
        //   { path: 'add', element: <AddCenter /> },
        //   { path: 'edit/:centerId', element: <EditCenter /> },
        // ]},
        // { path: 'package/seller', element: <SellerPrivateRoute roleName="ROLE_SELLER" />, children: [
        //   { path: '', element: <SellerPackageDetailPage /> },
        //   { path: 'add', element: <AddCenter /> },
        //   { path: 'edit/:packageId', element: <EditCenter /> },
        // ]},

        {
          path: 'admin', element: <AdminPrivateRoute roleName="ROLE_ADMIN" />, children: [
            {
              path: 'centers', element: <CenterPage />, children: [
                { path: 'info/:centerId', element: <InfoCenter /> },
              ]
            },
          ]
        },
        {
          path: 'owner', element: <OwnerPrivateRoute roleName="ROLE_OWNER" />, children: [
            {
              path: 'centers', element: <OwnerCenterPage />, children: [
                { path: 'add', element: <AddCenter /> },
                { path: 'edit/:centerId', element: <EditCenter /> },
              ]
            },
          ]
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
