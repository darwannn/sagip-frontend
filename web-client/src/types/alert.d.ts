export type SMSAlert = {
  alertTitle: string;
  alertMessage: string;
  location: string[] | string;
};

export type SMSAlertTemplate = {
  _id: string;
  alertTitle: string;
  alertMessage: string;
  createdAt: string;
  updatedAt: string;
};
