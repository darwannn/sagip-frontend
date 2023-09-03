import { User } from "../../../types/user";
import { TTeam } from "../../TeamManagement/Types/Team";

type TWeather = {
  _id: string;
  answers: any[];
  // TODO: You can replace 'any' with a more specific type if you know the structure of the 'answers' array
  assignedTeam: null | string | TTeam;
  category: string;
  createdAt: string;
  description: string;
  isArchived: boolean;
  latitude: number;
  longitude: number;
  municipality: string;
  proof: string;
  status: string;
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
