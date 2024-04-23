import express from "express";
import userRouter from './routes/user.routes';
import cors from 'cors'
import fileUpload from "express-fileupload"
import songRouter from "./routes/song.routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload"
}));
app.use("/user", userRouter)
app.use("/song", songRouter)

export default app;
