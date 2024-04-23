import express from "express";
import userRouter from './routes/user.routes';
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors());
app.use("/user", userRouter )

export default app;
