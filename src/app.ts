import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    }),
);

app.get("/", (req: Request, res: Response) => {
    res.send("Backend API Running...");
});

export default app;
