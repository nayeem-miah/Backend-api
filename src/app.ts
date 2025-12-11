import express, { Application, Request, Response } from "express";
import cors from "cors";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";


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
    res.send("Backend API Running...");
});


app.use(globalErrorHandler);

app.use(notFound);


export default app;
