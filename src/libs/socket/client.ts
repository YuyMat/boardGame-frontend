import { io, Socket } from "socket.io-client";

const backendUrl = "https://boardgame-backend-v1ew.onrender.com";

export const createSocket = (): Socket => {
  return io(backendUrl, { transports: ["websocket"], autoConnect: false });
};


