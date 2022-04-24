import express from 'express';
import morgan from "morgan";
import cors from "cors";
import dotenv from 'dotenv';

import ScheduleRouter from "./routes/ScheduleRouter.js"

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api", ScheduleRouter);

app.get('/', (request, response) => {
  response.send({message: "Welcome to the vaccine scheduling portal"})
})

app.use((request, response, next) => {
  const error = new Error("Schedule not found");
  error.status = 400
  next(error);
})

app.use((error, request, response, next) => {
  response.status(error.status || 500);
  return response.send({
      erro: {
          message: error.message
      }
  });
});


app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
});