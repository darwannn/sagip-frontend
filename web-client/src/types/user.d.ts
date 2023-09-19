export interface User {
  _id: string;
  firstname: string;
  middlename: string;
  lastname: string;
  contactNumber: string;
  email: string;
  region: string;
  province: string;
  municipality: string;
  barangay: string;
  street: string;
  gender: "Male" | "Female";
  birthdate: string;
  password: string;
  profilePicture: string;
  attempt: number;
  verificationCode: number;
  codeExpiration: string;
  userType: string;
  isOnline: boolean;
  isBanned: boolean;
  isArchived: boolean;
  status: string;
  verificationPicture: string[];
  createdAt: string;
  updatedAt: string;
  emailStatus: string;
  __v: number;

  verificationRequestDate?: string;
  confirmPassword?: string;
  target?: string;
}

export type TUserResData = {
  user: User;
  message: string;
  success: boolean;
  firstname?: string;
  middlename?: string;
  lastname?: string;
  contactNumber?: string;
  email?: string;
  region?: string;
  province?: string;
  municipality?: string;
  barangay?: string;
  street?: string;
  gender?: string;
  birthdate?: string;
  password?: string;
  confirmPassword?: string;
  profilePicture?: string;
  attempt?: number;
  verificationCode?: number;
  verificationPicture?: string[];

  [key: string]: string | undefined;
};
export interface UserDisplayInfo {
  _id: string;
  firstname: string;
  middlename: string;
  lastname: string;
  // contactNumber: string;
  // email: string;
  // region: string;
  // province: string;
  // municipality: string;
  // barangay: string;
  // street: string;
  // status: string;
}
