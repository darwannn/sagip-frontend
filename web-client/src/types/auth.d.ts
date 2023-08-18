export type AuthType = {
  token: string | null;

  passwordVerificationRes?: any;
  contactVerificationRes?: any;
  identifier?: string | null;
  newPasswordRes?: any;
};

export type Token = {
  exp: number;
  iat: number;
  id: string;

  for: string;
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

  identifier?: string;
  password?: string;
};
