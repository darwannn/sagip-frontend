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
  __v: number;
  _id: string;
};
