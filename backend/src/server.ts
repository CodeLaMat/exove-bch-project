import express, { Request, Response, NextFunction } from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

// db
import connectDB from "./db/connect";

//routers
import userRouter from "./routes/user";
import questionRouter from "./routes/questions";
import responsesRouter from "./routes/responses";

//middleware
import notFoundMiddleware from "./middleware/notFound";
import errorHandlerMiddleware from "./middleware/errorHandler";

const PORT = process.env.PORT || 5010;

app.use(express.json());

app.get("/api/v1", (req: Request, res: Response) => {
  res.json({ msg: "API" });
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/responses", responsesRouter);

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
