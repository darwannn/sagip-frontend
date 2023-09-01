import { User } from "./user";

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

type TResponder = {
  _id: string;
  firstname: string;
  middlename?: string;
  lastname: string;
  email: string;
  teamName?: string;
  teamId?: string;
};

type TResponders = {
  success: boolean;
  assignedResponders: User[];
  // unassignedResponders: Responder[];
  unassignedResponders: User[];
  responders: User[];
};

export type TTeamResponse = {
  message: string;
  success: boolean;
  team?: TTeam;
  name?: string;
};
