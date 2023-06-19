export type AuthType = {
  token: string | null;
  user: {
    for: string;
    id: string;
    status: string;
    userType: string;
  };
};

export type Token = {
  exp: number;
  iat: number;
  id: string;
};

// Response returned by login endpoint
export type AuthResponse = {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    for: string;
    id: string;
    status: string;
    userType: string;
  };
  identifier?: string;
  password?: string;
};
