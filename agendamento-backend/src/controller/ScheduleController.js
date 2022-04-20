import crypto from "crypto";
import dayjs from "dayjs";
import dotenv from 'dotenv';

dotenv.config();

const schedule = [];

const date = [];
const day = [];
//const time = [];


function scheduleSlots(schedulingDateTime) {
    console.log("chegando aqui")

   if (date.filter(element => element.dateTime === schedulingDateTime).length >= 2){
       return false;
   }
   if (day.filter(element => element.day === (schedulingDateTime.split(" ")[0])).length >= 20){
       return false;
   }
    date.push({dateTime: schedulingDateTime});
    //time.push({time: schedulingTime});
    console.log(date)

    day.push({day: schedulingDateTime.split(" ")[0]})
    console.log('-----------------------------------')
    console.log(day)
    return true;

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
                schedulingDateTime,
                //schedulingTime,
                attended,
            } = request.body;

            if (!(scheduleSlots(schedulingDateTime))){
                return response.status(400).send({message: "Fail to store entity Schedule"});;
            }
                //const chosenTime = time.filter(element => element.time === schedulingTime);
                // console.log(chosenTime)
                const chosenDateTime = date.filter(element => element.dateTime === schedulingDateTime);
                const limitDay = day.filter(element => element.day === schedulingDateTime.split(" ")[0])

                console.log(chosenDateTime);
                console.log("separando os limitadores");
                console.log(limitDay);

            if (chosenDateTime.length <= 2 && limitDay.length <= 20) {

                // console.log(date)
                // console.log(time)
                schedule.push({id,
                    name,
                    birthDate: dayjs(birthDate).format('YYYY-MM-DD'),
                    schedulingDateTime: dayjs(schedulingDateTime).format('YYYY/M/D HH:mm'),
                    //schedulingTime,
                    attended
                });
    
                return response.json(schedule);
            } else if (chosenDateTime.length > 2){
                return response.status(401).send({ message: "Limit of 2 patients per hour" })
            } else if (limitDay.length > 20){
               return response.status(401).send({ message: "Limit 20 patients per day"})
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
            schedulingDateTime,
            //schedulingTime,
            attended,
        } = request.body;

        const index = schedule.findIndex(element => element.id === id);
        console.log(index)

        if (index !== -1) { 
            schedule[index] = {id, name, birthDate, schedulingDateTime, attended};
            
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