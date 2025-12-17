import { Server, Socket } from "socket.io";

export const registerSocketEvents = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log("🟢 Socket connected:", socket.id);

        socket.on("user-data", (data) => {
            // console.log("📩 Message:", data);

            // ! save data in database

            // ! Emit message to all connected clients use getIO() or  io
            // getIO().emit("user-reponse-message", data);
            // ! Emit message to specific client
            socket.broadcast.emit("user-reponse-message", data);

            // ! save data in database
        });

        socket.on("disconnect", () => {
            console.log("🔴 Socket disconnected:", socket.id);
        });
    });
};
