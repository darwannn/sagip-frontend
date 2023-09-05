
export type TSignalResData = {
  success: boolean;
  signal: number;
  message: string;
  track: string;
  name: string;
  category: string;
  updatedAt: string;
};
export type TWeatherResData = {
  success: boolean;
  weather: string;
  icon: string;
  message: string;
};

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
