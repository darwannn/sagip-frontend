import { User } from "./user";

export type THazardReport = {
  category: string;
  createdAt: string;
  description: string;
  isArchived: boolean;
  latitude: number;
  longitude: number;
  municipality: string;
  proof: string;
  status: string; // unverified, ongoing, resolved
  street: string;
  updatedAt: string;
  userId: User;
  __v: number;
  _id: string;
};

export type THazardReportResData = {
  message: string;
  success: boolean;
  category?: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  municipality?: string;
  proof?: string;
  status?: string;
  street?: string;
  userId?: User;
};
