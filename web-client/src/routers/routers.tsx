import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import LoginPage, { action as loginAction } from "../pages/Login/LoginPage";
import RegistrationPage from "../pages/Register/RegisterPage";
import ForgotPasswordPage from "../pages/Register/ForgotPasswordPage";
import AdminRootLayout from "../pages/RootLayout/AdminRootLayout";

import ManageTeamPage from "../pages/TeamManagement/ManageTeamPage";
import EmergencyReportsPage from "../pages/EmergencyReports/EmergencyReportsPage";
import HazardReportsPage from "../pages/HazardReports/HazardReportsPage";
import ManageFacilitiesPage from "../pages/MapManagement/ManageFacilitiesPage";
import { checkAuth, isLoggedIn } from "../util/auth";
import ManageArticlesPage from "../pages/Articles/ManageArticlesPage";
import CreateArticlesPage from "../pages/Articles/CreateArticlesPage";
import ViewArticlePage from "../pages/Articles/ViewArticlePage";

import ManageAlertsPage from "../pages/AlertsManagement/ManageAlertsPage";
import CreateAlertPage from "../pages/AlertsManagement/CreateAlertsPage";
import ViewAlertsPage from "../pages/AlertsManagement/ViewAlertsPage";
import AlertReport from "../pages/AlertsManagement/components/AlertReport";

import ManageUserPage from "../pages/UserManagement/ManageUserPage";
import VerifyUserPage from "../pages/UserManagement/VerifyUserPage";
import CreateUserPage from "../pages/UserManagement/CreateUserPage";
import ViewUserPage from "../pages/UserManagement/ViewUserPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminRootLayout />,
    loader: checkAuth,
    children: [
      { index: true, element: <Home /> },
      {
        path: "users",
        // loader:
        children: [
          { index: true, element: <ManageUserPage /> },
          { path: "create", element: <CreateUserPage /> },
          { path: ":userId", element: <ViewUserPage /> },
          { path: "verify-users", element: <VerifyUserPage /> },
        ],
      },
      {
        path: "teams",
        element: <ManageTeamPage />,
      },
      {
        path: "emergency-reports",
        element: <EmergencyReportsPage />,
      },
      {
        path: "hazard-reports",
        element: <HazardReportsPage />,
      },
      {
        path: "facility-map",
        element: <ManageFacilitiesPage />,
      },
      {
        path: "disaster-alerts",
        children: [
          { index: true, element: <ManageAlertsPage /> },
          { path: "create", element: <CreateAlertPage /> },
          { path: ":alertId", element: <ViewAlertsPage /> },
          /* { path: "report/:alertId", element: <AlertReport /> }, */
        ],
      },
      {
        path: "articles",
        children: [
          { index: true, element: <ManageArticlesPage /> },
          { path: "create", element: <CreateArticlesPage /> },
          { path: ":articleId", element: <ViewArticlePage /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: isLoggedIn,
    action: loginAction,
  },
  { path: "/register", element: <RegistrationPage />, loader: isLoggedIn },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
    loader: isLoggedIn,
  },
  /* temporary, so the report will open in new tab (without side navigation menu) */
  {
    path: "/disaster-alerts/report/:alertId",
    element: <AlertReport />,
    loader: checkAuth,
  },
]);
