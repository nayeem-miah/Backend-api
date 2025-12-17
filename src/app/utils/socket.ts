// src/utils/socket.ts
import { Server as HttpServer } from "http";
import { Server } from "socket.io";

let io: Server;

export const initSocket = (server: HttpServer) => {
    io = new Server(server, {
        cors: {
            origin: ["http://localhost:3000", "http://localhost:5173"],
            credentials: true,
        },
    });

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error("❌ Socket.io not initialized!");
    }
    return io;
};
