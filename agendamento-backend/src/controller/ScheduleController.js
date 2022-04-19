import crypto from "crypto";
import dayjs from "dayjs";
import dotenv from 'dotenv';

dotenv.config();

const schedule = [];

const date = [];
const time = [];


function scheduleSlots(schedulingDate, schedulingTime) {
    console.log("chegando aqui")
   
    date.push({date: schedulingDate});
    time.push({time: schedulingTime});
    
}

class ScheduleController { //exportando as seguintes funções, que são as 5 do CRUD:
    
    index (request, response) {
        return response.json(schedule);
    }

    getOne(request, response) {
        const id = request.params.id;
        const index = schedule.findIndex(element => element.id === id)
        console.log(index)

        if (index !== -1){
            return response.json(schedule[index])
        }

        return response.status(404).send({message: "Schedule not found"}); 
    }

    store (request, response) {
        try {
            const id = crypto.randomUUID();
  
            const {
                name,
                birthDate,
                schedulingDate,
                schedulingTime,
                attended,
            } = request.body;

            scheduleSlots(schedulingDate, schedulingTime)

                const chosenTime = time.filter(element => element.time === schedulingTime);
                // console.log(chosenTime)
                const chosenDate = date.filter(element => element.date === schedulingDate)
          

            if (chosenDate.length <= 20 && chosenTime.length <= 2) {
                // console.log(date)
                // console.log(time)
                schedule.push({id,
                    name,
                    birthDate,
                    schedulingDate: dayjs(schedulingDate).format('YYYY-MM-DD'),
                    schedulingTime,
                    attended});
    
                return response.json(schedule);
            } else if (chosenDate.length > 20){
                return response.status(401).send({ message: "Limit 20 patients per day" })
            } else if (chosenTime.length > 2){
                return response.status(401).send({ message: "Limit of 2 patients per hour" })
            }
      
        } catch (error) {
            return response.status(400).send({message: "Fail to store entity Schedule"});
        }
    }

    update (request, response) {
        const id = request.params.id;
        const {
            name,
            birthDate,
            schedulingDate,
            schedulingTime,
            attended,
        } = request.body;

        const index = schedule.findIndex(element => element.id === id);
        console.log(index)

        if (index !== -1) { 
            schedule[index] = {id, name, birthDate, schedulingDate, schedulingTime, attended};
            
            return response.json(schedule[index]);
        }
        return response.status(404).send({message: "Schedule not found"});

    }

    remove (request, response) {
        
        const id = request.params.id;
        const index = schedule.findIndex(element => element.id === id);

        if (index !== -1) {
            schedule.splice(index, 1);

            return response.json({message: "Agendamento cancelado"});
        }
        return response.status(404).send({message: "Schedule not found"});
    }
}

export default ScheduleController;