export type SMS = {
  alertTitle: string;
 // alertMessage: string;
  //location: string[];
};

export type TSurvey = {
  _id: string;
  title: string;
  category: string;
  unaffected: string[];
  affected: string[];
  status: string;
  isArchived: boolean;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;

};
export type TActiveSurvey = {
  _id: string;
  title: string;
  category: string;
  unaffected: string[];
  affected: string[];
  status: string;
  isArchived: boolean;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;

  success?: boolean;
};
export type TSurveyReport = {
  _id: string;
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  unaffected: string[];
  affected: string[];
  status: string;
  success: boolean;
  responseCount: number;
  affectedCount: number;
  unaffectedCount: number;



};

export type TSMSResData = {
  message: string;
  success: boolean;
};

export type TSurveyResData = {
  survey: Survey;
  message: string;
  success: boolean;
  title?: string;
  category?: string;
  unaffected?: string[];
  affected?: string[];
};

export const AlertTypes = [
  "Flood",
  "Earthquake",
];
