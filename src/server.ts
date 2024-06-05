import express from "express";
import userRouter from "./routes/user.routes";
import cors from "cors";
import songRouter from "./routes/song.routes";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(bodyParser.json());
app.use(cors());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  })
);

app.use("/user", userRouter);
app.use("/song", songRouter);

export default app;
