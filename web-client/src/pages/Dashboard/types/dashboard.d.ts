/* TODO: should be assistance request type */
import { THazardReport } from "../../HazardReports/types/hazardReport";

export type TDashboard = {
  emergencyFacilities: number;
  pendingAssistanceRequests: number;
  pendingHazardReports: number;
  articles: number;
  publishedArticles: number;
  draftArticles: number;
  users: number;
  residents: number;
  staffs: number;
  usersThisMonth: number;
  activeUsersThisMonth: number;
  responses: number;
  verifiedUsers: number;
  unverifiedUsers: number;
  dispatchers: number;
  responders: number;
  admins: number;
  superAdmins: number;
  assistanceRequests: THazardReport[];
};
