export type TUserNotification = {
  createdAt: string;
  isRead: boolean;
  linkId: string;
  message: string;
  title: string;
  type: string;
  updatedAt: string;
  userId: string;
  __v: number;
  _id: string;
};

export type NotificationRes = TUserNotification[];
