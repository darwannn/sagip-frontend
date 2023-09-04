export type SMSAlert = {
  alertTitle: string;
  alertMessage: string;
  location: string[] | string;
};

export type SMSAlertRes = {
  message: string;
  smsAlert: SMSAlertTemplate;
  success: boolean;
};

export type SMSAlertTemplate = {
  _id: string;
  alertTitle: string;
  alertMessage: string;
  createdAt: string;
  updatedAt: string;
};
