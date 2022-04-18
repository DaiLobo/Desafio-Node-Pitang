
import express, { request, response } from 'express';
import dotenv from 'dotenv';

import ScheduleRouter from "./routes/ScheduleRouter.js"

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use("/api", ScheduleRouter);

const schedule = [];

app.get('/', (req, res, next) => {
  res.json({message: "Tudo ok por aqui!", dados: schedule});
})

app.post("/schedule", (request, response, next) => {
  console.log("Agendamento realizado");
  //salvando os dados em memória
  schedule.push({
    nome: request.body.name,
    idade: parseInt(request.body.age)
  });
  response.json({message: "Tudo certo", dados: schedule})
});

app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
});