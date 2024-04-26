import express from "express";
import userRouter from "./routes/user.routes";
// import cors from "cors";
import songRouter from "./routes/song.routes";
// import bodyParser from "body-parser";

const app = express();

app.use(express.json());
// app.use(bodyParser.json());
// app.use(cors());
app.use("/user", userRouter);
app.use("/song", songRouter);

export default app;
