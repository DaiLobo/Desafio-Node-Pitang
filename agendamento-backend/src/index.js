import express from 'express';
import dotenv from 'dotenv';

import ScheduleRouter from "./routes/ScheduleRouter.js"

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use("/api", ScheduleRouter);

app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
});
