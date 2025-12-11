/* eslint-disable no-console */
import http, { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";


let server: Server | null = null;
const port = config.port || 5000;

async function connectDb(): Promise<void> {
    try {
        // ? connect to database
        const mongoUri = config.database_url || "mongodb://localhost:27017/mydatabase";
        if (!mongoUri) {
            throw new Error("MONGO_URI environment variable is required");
        }
        await mongoose.connect(mongoUri);

        console.log(" Database connected successfully!");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}


async function startServer(): Promise<void> {
    try {
        await connectDb();

        server = http.createServer(app);

        server.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });

        registerProcessEvents();
    } catch (error) {
        console.error("Error while starting the server:", error);
        process.exit(1);
    }
}


async function gracefulShutdown(signal: string): Promise<void> {
    console.warn(`⚠️ Received ${signal}. Closing server gracefully...`);

    if (server) {
        server.close(async () => {
            console.log("HTTP server closed.");

            try {
                await mongoose.connection.close();
                console.log(" Database connection closed.");
            } catch (error) {
                console.error("Error closing database connection:", error);
            }

            console.log("Server shutdown completed.");
            process.exit(0);
        });
    } else {
        process.exit(0);
    }
}


function registerProcessEvents(): void {
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));

    process.on("uncaughtException", (error) => {
        console.error(" Uncaught Exception:", error);
        gracefulShutdown("uncaughtException");
    });

    process.on("unhandledRejection", (reason) => {
        console.error(" Unhandled Promise Rejection:", reason);
        process.exit(1);
    });
}

startServer();

