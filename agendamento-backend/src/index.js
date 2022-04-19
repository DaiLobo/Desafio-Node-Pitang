import express from 'express';
import morgan from "morgan";
import dotenv from 'dotenv';
// import crypto from "crypto";

import ScheduleRouter from "./routes/ScheduleRouter.js"

dotenv.config();

//const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/api", ScheduleRouter);

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


// const schedule = [];

// app.get('/schedule', (request, response) => {
//   return response.json(schedule)
// });

// app.get('/schedule/:id', (request, response) => {
//   const id = request.params.id;
//   const index = schedule.findIndex(element => element.id === id)
//   return response.json(schedule[index])
// });

// app.post('/schedule', (request, response) => {
//   const id = crypto.randomUUID();
  
//   const {
//     name,
//     birthDate,
//     schedulingDate,
//     schedulingTime,
//     attended,
//   } = request.body

//   schedule.push({id,
//     name,
//     birthDate,
//     schedulingDate,
//     schedulingTime,
//     attended})

//   return response.json(schedule);
// });

// app.put('/schedule/:id', (request, response) => {
//   const id = request.params.id;
//   const {
//     name,
//     birthDate,
//     schedulingDate,
//     schedulingTime,
//     attended,
//   } = request.body;

//   const index = schedule.findIndex(element => element.id === id)
//   console.log(index)

//   schedule[index] = {id, name, birthDate, schedulingDate, schedulingTime, attended};
  
//   return response.json(schedule);
// });

// app.delete('/schedule/:id', (request, response) => {
//   const id = request.params.id;
//   const index = schedule.findIndex(element => element.id === id)
//   schedule.splice(index, 1);

//   return response.json({message: "Agendamento cancelado"})
// })


app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
});