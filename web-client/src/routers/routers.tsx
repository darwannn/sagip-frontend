import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import AdminRootLayout from "../pages/RootLayout/AdminRootLayout";

import ManageTeamPage from "../pages/Admin/TeamManagement/ManageTeamPage";
import EmergencyReportsPage from "../pages/Admin/AssistanceRequestManagement/EmergencyReportsPage";
import HazardReportsPage from "../pages/Admin/HazardReportsManagement/HazardReportsPage";
import ManageFacilitiesPage from "../pages/Admin/FacilityManagement/ManageFacilitiesPage";
import { checkAuth, isLoggedIn } from "../util/auth";
import ManageArticlesPage from "../pages/Admin/ArticleManagement/ManageArticlesPage";
import CreateArticlesPage from "../pages/Admin/ArticleManagement/CreateArticlesPage";
import ViewArticlePage from "../pages/Admin/ArticleManagement/ViewArticlePage";
import TeamDetails from "../pages/Admin/TeamManagement/components/TeamDetails";
import ManageRespondersPage from "../pages/Admin/TeamManagement/ManageRespondersPage";

import ManageSurveyPage from "../pages/Admin/WellnessCheckManagement/ManageSurveyPage";
import CreateSurveyPage from "../pages/Admin/WellnessCheckManagement/CreateSurveyPage";
import ViewSurveyPage from "../pages/Admin/WellnessCheckManagement/ViewSurveyPage";
import SurveyReport from "../pages/Admin/WellnessCheckManagement/components/SurveyReport";

import ManageUserPage from "../pages/Admin/UserManagement/ManageUserPage";
import VerifyUserPage from "../pages/Admin/UserManagement/VerifyUserPage";
import CreateUserPage from "../pages/Admin/UserManagement/CreateUserPage";
import ViewUserPage from "../pages/Admin/UserManagement/ViewUserPage";

import ManageAccountPage from "../pages/Admin/AccountSettings/ManageAccountPage";

import NewPasswordPage from "../pages/NewPassword/NewPasswordPage";
import ForgotPasswordPage from "../pages/ForgotPassword/ForgotPasswordPage";
import ForgotPasswordContactVerification from "../pages/ForgotPassword/ForgotPasswordContactVerification";

import RegistrationPage from "../pages/Register/RegistrationPage";
import RegisterContactVerification from "../pages/Register/components/RegistrationContactVerification";
import RegistrationAlmostDone from "../pages/Register/components/RegistrationAlmostDone";
import IdentityVerificationPage from "../pages/IdentityVerification/IdentityVerificationPage";

import LoginPage from "../pages/Login/LoginPage";
import LoginContactVerification from "../pages/Login/LoginContactVerification";
import AccountProfileForm from "../pages/Admin/AccountSettings/components/AccountProfileForm";
import AccountEmailForm from "../pages/Admin/AccountSettings/components/AccountEmailForm";
import AccountContactNumberForm from "../pages/Admin/AccountSettings/components/AccountContactNumberForm";
import AccountPasswordForm from "../pages/Admin/AccountSettings/components/AccountPasswordForm";
import TEMP_ROOT_PAGE from "../pages/RootLayout/Temp_RootPage";
import AlertPage from "../pages/Admin/AlertsManagement/AlertPage";

import ArticlesPage from "../pages/Mobile/Articles/ArticlesPage";
import ArticlesData from "../pages/Mobile/Articles/components/ArticlesData";

import LandingPage from "../pages/LandingPage/LandingPage";
import Home from "../pages/Mobile/Home/Home";
import EmergencyHotlinesPage from "../pages/Mobile/EmergencyHotlines/EmergencyHotlinesPage";
import AccountSettingsPage from "../pages/Admin/AccountSettings/AccountSettingsPage";
import ArticlePreviewPage, {
  ArticlePreviewLoader,
} from "../pages/Admin/ArticleManagement/ArticlePreviewPage";

import MobileAccountSettingPage from "../pages/Mobile/AccountSettings/AccountSettingsPage";
import ResponderPage from "../pages/Mobile/ResponderPage/ResponderPage";
import ResponderMap from "../pages/Mobile/ResponderPage/components/ResponderMap";
import HazardMap from "../pages/Mobile/HazardMap/HazardMap";
import UserInfoForm from "../pages/Admin/UserManagement/components/UserInfoForm";
import UserAccountOptions from "../pages/Admin/UserManagement/components/UserAccountOption";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <TEMP_ROOT_PAGE />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "login",
        loader: isLoggedIn,
        children: [
          {
            index: true,
            element: <LoginPage />,
          },
          {
            path: "contact-verification",
            element: <LoginContactVerification />,
          },
        ],
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
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "emergency-hotlines",
        element: <EmergencyHotlinesPage />,
      },
      {
        path: "articles",
        /* loader: isLoggedIn, */
        children: [
          { index: true, element: <ArticlesPage /> },
          {
            path: ":articleId",
            element: <ArticlesData />,
          },
          {
            path: "saved",
            element: <ArticlesData />,
          },
        ],
      },
      {
        path: "account-settings",
        element: <MobileAccountSettingPage />,
      },
      {
        path: "responder",
        children: [
          { index: true, element: <ResponderPage /> },
          {
            path: "emergency-reports",
            element: <ResponderMap />,
          },
        ],
      },
      {
        path: "hazard-map",
        element: <HazardMap />,
      },
    ],
  },

  {
    path: "admin",
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
          {
            path: ":userId",
            element: <ViewUserPage />,
            children: [
              { index: true, element: <UserInfoForm /> },
              { path: "account-actions", element: <UserAccountOptions /> },
            ],
          },
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
        path: "wellness-check",
        children: [
          { index: true, element: <ManageSurveyPage /> },
          { path: "create", element: <CreateSurveyPage /> },
          { path: ":alertId", element: <ViewSurveyPage /> },
          /* { path: "report/:alertId", element: <AlertReport /> }, */
        ],
      },
      {
        path: "manage-articles",
        children: [
          { index: true, element: <ManageArticlesPage /> },
          { path: "create", element: <CreateArticlesPage /> },
          { path: "edit/:articleId", element: <ViewArticlePage /> },
        ],
      },
      {
        path: "alert-management",
        element: <AlertPage />,
      },
      {
        path: "account-settings",
        element: <ManageAccountPage />,
        children: [
          { index: true, element: <AccountSettingsPage /> },
          { path: "profile", element: <AccountProfileForm /> },
          { path: "contact-number", element: <AccountContactNumberForm /> },
          { path: "email", element: <AccountEmailForm /> },
          { path: "password", element: <AccountPasswordForm /> },
        ],
      },
    ],
  },

  {
    path: "preview/article/:id",
    element: <ArticlePreviewPage />,
    loader: ArticlePreviewLoader,
    // children: [{ path: ":id", element: <ArticlePreviewPage /> }],
  },
  /* temporary, so the report will open in new tab (without side navigation menu) */
  {
    path: "/wellness-check/report/:surveyId",
    element: <SurveyReport />,
    loader: checkAuth,
  },
]);
