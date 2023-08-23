import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import LoginPage, { action as loginAction } from "../pages/Login/LoginPage";
import AdminRootLayout from "../pages/RootLayout/AdminRootLayout";

import ManageTeamPage from "../pages/TeamManagement/ManageTeamPage";
import EmergencyReportsPage from "../pages/EmergencyReports/EmergencyReportsPage";
import HazardReportsPage from "../pages/HazardReports/HazardReportsPage";
import ManageFacilitiesPage from "../pages/MapManagement/ManageFacilitiesPage";
import { checkAuth, isLoggedIn } from "../util/auth";
import ManageArticlesPage from "../pages/Articles/ManageArticlesPage";
import CreateArticlesPage from "../pages/Articles/CreateArticlesPage";
import ViewArticlePage from "../pages/Articles/ViewArticlePage";
import TeamDetails from "../pages/TeamManagement/Components/TeamDetails";
import ManageRespondersPage from "../pages/TeamManagement/ManageRespondersPage";

import ManageAlertsPage from "../pages/AlertsManagement/ManageAlertsPage";
import CreateAlertPage from "../pages/AlertsManagement/CreateAlertsPage";
import ViewAlertsPage from "../pages/AlertsManagement/ViewAlertsPage";
import AlertReport from "../pages/AlertsManagement/components/AlertReport";

import ManageUserPage from "../pages/UserManagement/ManageUserPage";
import VerifyUserPage from "../pages/UserManagement/VerifyUserPage";
import CreateUserPage from "../pages/UserManagement/CreateUserPage";
import ViewUserPage from "../pages/UserManagement/ViewUserPage";

import ManageAccountPage from "../pages/AccountSettings/ManageAccountPage";

import NewPasswordPage from "../pages/NewPassword/NewPasswordPage";
import ForgotPasswordPage from "../pages/ForgotPassword/ForgotPasswordPage";
import ForgotPasswordContactVerification from "../pages/ForgotPassword/ForgotPasswordContactVerification";

import RegistrationPage from "../pages/Register/RegistrationPage";
import RegisterContactVerification from "../pages/Register/components/RegistrationContactVerification";
import RegistrationAlmostDone from "../pages/Register/components/RegistrationAlmostDone";
import IdentityVerificationPage from "../pages/IdentityVerification/IdentityVerificationPage";

/* import LoginContactVerification from "../pages/Login/LoginContactVerification"; */

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminRootLayout />,
    loader: checkAuth,
    children: [
      { index: true, element: <Dashboard /> },
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
        children: [
          { index: true, element: <ManageRespondersPage /> },
          { path: ":id", element: <TeamDetails /> },
        ],
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
      {
        path: "account-settings",
        children: [
          { index: true, element: <ManageAccountPage /> },
          { path: ":page", element: <ManageAccountPage /> },
          { path: ":page", element: <ManageAccountPage /> },
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

  {
    path: "register",
    /* loader: isLoggedIn, */
    children: [
      { index: true, element: <RegistrationPage /> },
      {
        path: "contact-verification",
        element: <RegisterContactVerification />,
      },
      {
        path: "identity-verification",
        element: <RegistrationAlmostDone />,
      },
    ],
  },
  {
    path: "identity-verification",
    element: <IdentityVerificationPage />,
  },
  {
    path: "forgot-password",
    /* loader: isLoggedIn, */
    children: [
      { index: true, element: <ForgotPasswordPage /> },
      {
        path: "contact-verification",
        element: <ForgotPasswordContactVerification />,
      },
    ],
  },
  {
    path: "/new-password",
    element: <NewPasswordPage />,
    /* loader: isLoggedIn, */
  },
  /* temporary, so the report will open in new tab (without side navigation menu) */
  {
    path: "/disaster-alerts/report/:alertId",
    element: <AlertReport />,
    loader: checkAuth,
  },
]);
