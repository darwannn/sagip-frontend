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
  gender: string;
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
  __v: number;
  verificationRequestDate: string;
}

// type UserArray = User[];
