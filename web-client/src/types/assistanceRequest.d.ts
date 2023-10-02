import { User } from "./user";
import { TTeam } from "./team";

type TAssistanceRequest = {
  _id: string;
  answers: any[];
  // TODO: You can replace 'any' with a more specific type if you know the structure of the 'answers' array
  assignedTeam: null | TTeam;
  category: string;
  createdAt: string;
  description: string;
  isArchived: boolean;
  latitude: number;
  longitude: number;
  municipality: string;
  proof: string;
  status: "unverified" | "ongoing" | "resolved";
  street: string;
  userId: User;
};

type TAssistanceReqResponse = {
  success: boolean;
  message: string;
  assistanceRequest: TAssistanceRequest;
  reason?: string;
  note?: string;
};

type TAssistanceRequestState = {
  selectedAssistanceRequest: TAssistanceRequest | null;
};
