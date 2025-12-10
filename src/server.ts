import http, { Server } from "http";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

let server: Server | null = null;
const port = process.env.PORT || 5000;

async function connectDb() {
    try {
        // ! Connect to your database here
        console.log("*** database connected succesfull!!");
    } catch (error) {
        console.log("*** Db connection failed!!");
        process.exit(1);
    }
}

async function startServer() {
    try {
        await connectDb();
        server = http.createServer(app);

        server.listen(port, () => {
            console.log(` Server is running on port ${port}`);
        });

        handleProcessEvents();
    } catch (error) {
        console.error("Error during server startup:", error);
        process.exit(1);
    }
}

async function gracefulShutdown(signal: string) {
    console.warn(` Received ${signal}, shutting down gracefully...`);

    if (server) {
        server.close(async () => {
            console.log(" HTTP server closed.");

            try {
                console.log("Server shutdown complete.");
            } catch (error) {
                console.error(" Error during shutdown:", error);
            }

            process.exit(0);
        });
    } else {
        process.exit(0);
    }
}

function handleProcessEvents() {
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));

    process.on("uncaughtException", (error) => {
        console.error(" Uncaught Exception:", error);
        gracefulShutdown("uncaughtException");
    });

    process.on("unhandledRejection", (reason) => {
        console.error(" Unhandled Rejection:", reason);
        gracefulShutdown("unhandledRejection");
    });
}

startServer();