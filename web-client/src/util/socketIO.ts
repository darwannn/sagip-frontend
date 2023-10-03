import * as io from "socket.io-client";
/* const socket = io.connect("http://localhost:5000"); */
const socket = io.connect("https://sagip.onrender.com");

type TEventData = {
  sender: string;
  receiver: string;
  content?: {
    latitude?: number;
    longitude?: number;
  };
};

export const receiveEvent = (
  eventName: string,
  callback: (data: TEventData) => void
): (() => void) => {
  socket.on(eventName, (data: TEventData) => {
    callback(data);
  });

  return () => {
    socket.disconnect();
  };
};
