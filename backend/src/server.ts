import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// db
import connectDB from "./db/connect";

//routers
import userRouter from "./routes/user";
import questionRouter from "./routes/questions";
import responsesRouter from "./routes/responses";
import surveyRouter from "./routes/surveys";
import surveyPackRouter from "./routes/surveyPack";

//middleware
import notFoundMiddleware from "./middleware/notFound";
import errorHandlerMiddleware from "./middleware/errorHandler";

const PORT = process.env.PORT || 5010;

app.use(morgan("tiny"));
app.use(
  cors({
    origin: "http://localhost:3000", // replace with the origin of your client application
    credentials: true, // enable credentials for all endpoints
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser(`${process.env.JWT_SECRET}`));

app.get("/api/v1", (req: Request, res: Response) => {
  res.json({ msg: "API" });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/responses", responsesRouter);
app.use("/api/v1/surveys", surveyRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/surveyPack", surveyPackRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(`${process.env.MONGO_URL}`);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
