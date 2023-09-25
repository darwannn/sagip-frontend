import { TUserResData } from "./user";

export type AuthType = {
  token: string | null;

  passwordVerificationRes?: Partial<TUserResData> | null;
  contactVerificationRes?: Partial<TUserResData> | null;
  identifier?: string | null;
  newPasswordRes?: Partial<TUserResData> | null;
  displayedRegisterPage?: string | null;
  displayedVerificationPage?: string | null;
  registrationSuccessful?: boolean | null;
};

export type Token = {
  exp: number;
  iat: number;
  id: string;

  target: string;
  id: string;
  status: string;
  userType: string;
  identifier: string;
};

// Response returned by login endpoint
export type AuthResponse = {
  success: boolean;
  message: string;
  token?: string;
  userType?: string;
  identifier?: string;
  password?: string;
};
