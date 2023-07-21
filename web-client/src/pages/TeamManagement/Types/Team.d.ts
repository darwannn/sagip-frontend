import { User } from "../../../types/user";

export type TTeam = {
  _id: string;
  name: string;
  head: User;
  members: User[];
  response: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
};
