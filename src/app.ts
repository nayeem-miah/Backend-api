import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";


const app: Application = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:5173"],
        credentials: true,
    }),
);

app.get("/", (req: Request, res: Response) => {
    res.json({
        success: true,
        statusCode: 200,
        message: "Welcome to SMT-Project Backend API"
    });
});

app.use(globalErrorHandler);

app.use(notFound);


export default app;
