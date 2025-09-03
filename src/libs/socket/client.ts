import { io, Socket } from "socket.io-client";

const backendUrl = process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:4000";

export const createSocket = (): Socket => {
  return io(backendUrl, { transports: ["websocket"], autoConnect: false });
};


