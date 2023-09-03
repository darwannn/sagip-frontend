export type SMSAlert = {
  alertTitle: string;
  alertMessage: string;
  location: string[] | string;
};

export type SMSAlerTemplate = {
  _id: string;
  alertTitle: string;
  alertMessage: string;
  createdAt: string;
  updatedAt: string;
};
