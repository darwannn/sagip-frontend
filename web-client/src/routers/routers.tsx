import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import AdminRootLayout from "../pages/RootLayout/AdminRootLayout";

import ManageTeamPage from "../pages/Admin/TeamManagement/ManageTeamPage";
import EmergencyReportsPage from "../pages/Admin/AssistanceRequestManagement/EmergencyReportsPage";
import HazardReportsPage from "../pages/Admin/HazardReportsManagement/HazardReportsPage";
import ManageFacilitiesPage from "../pages/Admin/FacilityManagement/ManageFacilitiesPage";
import { allowedUserType, isLoggedIn, isInForgotPassword } from "../util/auth";
import ManageArticlesPage from "../pages/Admin/ArticleManagement/ManageArticlesPage";
import CreateArticlesPage from "../pages/Admin/ArticleManagement/CreateArticlesPage";
import ViewArticlePage from "../pages/Admin/ArticleManagement/ViewArticlePage";
import TeamDetails from "../pages/Admin/TeamManagement/components/TeamDetails";
import ManageRespondersPage from "../pages/Admin/TeamManagement/ManageRespondersPage";

import ManageSurveyPage from "../pages/Admin/WellnessCheckManagement/ManageSurveyPage";
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
import MobileRootPage from "../pages/RootLayout/MobileRootPage";
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
import VerifyUserData from "../pages/Admin/UserManagement/components/VerifyUserData";

import HazardReportPage from "../pages/Mobile/HazardReport/HazardReportPage";
import SubmitHazardReportForm from "../pages/Mobile/HazardReport/components/SubmitHazardReportForm";
import EmergencyPage from "../pages/Admin/AssistanceRequestManagement/EmergencyPage";
import AssistanceRequestPage from "../pages/Mobile/AssistanceRequest/AssistanceRequestPage";
import NotificationPage from "../pages/Mobile/Notification/NotificationPage";

export const router = createBrowserRouter([
  {
    path: "/",

    element: <MobileRootPage />,
    children: [
      {
        index: true,
        loader: () => isLoggedIn(["super-admin", "admin", "dispatcher"]),
        element: <LandingPage />,
      },
      {
        path: "login",
        loader: () => isLoggedIn(["super-admin", "admin", "dispatcher"]),

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
        loader: () => isLoggedIn(["super-admin", "admin", "dispatcher"]),
        children: [
          { index: true, element: <RegistrationPage /> },
          {
            path: "contact-verification",
            loader: () => allowedUserType(["resident"], true),
            element: <RegisterContactVerification />,
          },
          {
            loader: () => allowedUserType(["resident"], true),
            path: "identity-verification",

            element: <RegistrationAlmostDone />,
          },
        ],
      },
      {
        path: "identity-verification",
        loader: () => allowedUserType(["resident"], true),
        element: <IdentityVerificationPage />,
      },
      {
        path: "forgot-password",

        children: [
          { index: true, element: <ForgotPasswordPage /> },
          {
            path: "contact-verification",
            loader: () => isInForgotPassword("forgot-password"),
            element: <ForgotPasswordContactVerification />,
          },
        ],
      },
      {
        path: "new-password",
        element: <NewPasswordPage />,
        loader: () => isInForgotPassword("new-password"),
      },
      {
        path: "home",
        loader: () => allowedUserType(["responder", "resident"], false),
        element: <Home />,
      },
      {
        path: "emergency-hotlines",
        loader: () => allowedUserType(["responder", "resident"], false),
        element: <EmergencyHotlinesPage />,
      },
      {
        path: "articles",

        loader: () => allowedUserType(["responder", "resident"], false),
        children: [
          { index: true, element: <ArticlesPage /> },
          {
            path: ":articleId",
            element: <ArticlesData />,
          },
          {
            path: "saved",
            element: <ArticlesPage />,
          },
        ],
      },
      {
        path: "account-settings",
        loader: () => allowedUserType(["responder", "resident"], true),
        element: <MobileAccountSettingPage />,
      },
      {
        path: "notification",
        loader: () => allowedUserType(["responder", "resident"], true),
        element: <NotificationPage />,
      },
      {
        path: "responder",
        loader: () => allowedUserType(["responder"], true),
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
        loader: () => allowedUserType(["responder", "resident"], false),
        element: <HazardMap />,
      },
      {
        path: "hazard-reports",
        loader: () => allowedUserType(["responder", "resident"], false),
        children: [
          { index: true, element: <HazardReportPage /> },
          {
            path: "create",
            loader: () => allowedUserType(["responder", "resident"], true),
            element: <SubmitHazardReportForm />,
          },
          {
            path: "edit/:hazardId",
            loader: () => allowedUserType(["responder", "resident"], true),
            element: <SubmitHazardReportForm />,
          },
        ],
      },
      {
        path: "emergency-reports",
        loader: () => allowedUserType(["responder", "resident"], true),
        children: [{ index: true, element: <AssistanceRequestPage /> }],
      },
    ],
  },

  {
    path: "admin",
    element: <AdminRootLayout />,
    children: [
      {
        index: true,
        loader: () =>
          allowedUserType(
            ["super-admin", "admin", "dispatcher", "responder"],
            true
          ),
        element: <Dashboard />,
      },
      {
        path: "users",
        loader: () => allowedUserType(["super-admin"], true),
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
          {
            path: "verify-users",
            element: <VerifyUserPage />,
            children: [{ path: ":userId", element: <VerifyUserData /> }],
          },
        ],
      },
      {
        path: "teams",
        loader: () =>
          allowedUserType(["super-admin", "admin", "dispatcher"], true),
        element: <ManageTeamPage />,
        children: [
          { index: true, element: <ManageRespondersPage /> },
          { path: ":id", element: <TeamDetails /> },
        ],
      },
      {
        path: "emergency-reports",
        loader: () =>
          allowedUserType(["super-admin", "admin", "dispatcher"], true),
        children: [
          { index: true, element: <EmergencyReportsPage /> },
          { path: ":id", element: <EmergencyPage /> },
        ],
      },
      {
        path: "hazard-reports",
        loader: () =>
          allowedUserType(["super-admin", "admin", "dispatcher"], true),
        element: <HazardReportsPage />,
      },
      {
        path: "facility-map",
        loader: () =>
          allowedUserType(["super-admin", "admin", "dispatcher"], true),
        element: <ManageFacilitiesPage />,
      },
      {
        path: "wellness-check",
        loader: () => allowedUserType(["super-admin", "admin"], true),
        children: [
          { index: true, element: <ManageSurveyPage /> },
          { path: ":surveyId", element: <ViewSurveyPage /> },
          /* { path: "report/:alertId", element: <AlertReport /> }, */
        ],
      },
      {
        path: "manage-articles",
        loader: () => allowedUserType(["super-admin", "admin"], true),
        children: [
          { index: true, element: <ManageArticlesPage /> },
          { path: "create", element: <CreateArticlesPage /> },
          { path: "edit/:articleId", element: <ViewArticlePage /> },
        ],
      },
      {
        path: "alert-management",
        loader: () =>
          allowedUserType(["super-admin", "admin", "dispatcher"], true),
        element: <AlertPage />,
      },
      {
        path: "account-settings",
        loader: () =>
          allowedUserType(["super-admin", "admin", "dispatcher"], true),
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

  {
    path: "/wellness-check/report/:surveyId",
    loader: () => allowedUserType(["super-admin", "admin"], true),
    element: <SurveyReport />,
  },
]);
