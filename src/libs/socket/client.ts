import { io, Socket } from "socket.io-client";

const env = process.env.NEXT_PUBLIC_ENV;
const publicBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const backendUrl =
  env === "local"
    ? "http://localhost:4000"
    : publicBackendUrl ?? "https://boardgame-backend-v1ew.onrender.com";

export const createSocket = (): Socket => {
  return io(backendUrl, { transports: ["websocket"], autoConnect: false });
};
