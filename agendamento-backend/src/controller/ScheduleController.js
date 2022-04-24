import crypto from "crypto";
import dayjs from "dayjs";
import * as yup from "yup";
import dotenv from 'dotenv';

dotenv.config();

const schedule = [];

function currentDates (chosenDate, chosenHour) { 

    const currentTime = new Date().getTime();

    if (chosenHour <= currentTime) {
        return false;
    }
   
    const currentDate = dayjs(new Date()).format('YYYY/M/D');

    if (Number(chosenDate) <= Number(currentDate)){
        return false;
    }

    return true;
}


function scheduleSlots(schedulingDateTime) {

    //twenty schedules per day
    const chosenDate = dayjs(schedulingDateTime).format('YYYY/M/D');
    const dateFormated = schedule.map(element => dayjs(element.schedulingDateTime).format('YYYY/M/D'))
    const limitDay = dateFormated.filter(element => element === chosenDate)

    //two schedules per hour
    const chosenHour = Date.parse(dayjs(schedulingDateTime).format('YYYY/M/D HH:mm'))
    const hourFormated = schedule.map(element => Date.parse(element.schedulingDateTime))

    const limitHour = hourFormated.filter(element => {
        if (element === chosenHour){
            return element;
        }
    })
    
    if (limitDay.length >= 20 || limitHour.length >=2){
        return false;
    }
    
    if(!currentDates(chosenDate, chosenHour)) {
        return response.status(400).send({message: "Fail to store entity Schedule"});
    }

    return true;

}

//Validação

const schema = yup.object().shape({
    name: yup.string().required(),
    birthDate: yup.date().required(),
    schedulingDateTime: yup.date().required(),
    attended: yup.bool().default(false),
})

class ScheduleController { //exportando as seguintes funções, que são as 5 do CRUD:
    
    index (request, response) {
        return response.json(schedule);
    }

    getOne(request, response) {
        const id = request.params.id;
        const index = schedule.findIndex(element => element.id === id)

        if (index !== -1){
            return response.json(schedule[index])
        }

        return response.status(404).send({message: "Schedule not found"}); 
    }

    async store (request, response) {
        const id = crypto.randomUUID();
        
        const {
            name,
            birthDate,
            schedulingDateTime,
            attended,
        } = request.body;
        
        try {

            const validation = await schema.validate(request.body)

            if (validation.error) {
                return response.status(400).json(validation);
            }

            if (!(scheduleSlots(schedulingDateTime))){
                return response.status(400).send({message: "Fail to store entity Schedule: invalid date"});
            }
            
            schedule.push({id,
                name,
                birthDate: dayjs(birthDate).format('YYYY/MM/DD'),
                schedulingDateTime: dayjs(schedulingDateTime).format('YYYY/M/D HH:mm'),
                attended: false
            });

            return response.json(schedule);
      
        } catch (error) {
            return response.status(400).send({message: "Fail to store entity Schedule"});
        }
    }

    async update (request, response) {
        const id = request.params.id;
        const {
            name,
            birthDate,
            schedulingDateTime,
            attended,
        } = request.body;

        try {

            const validation = await schema.validate(request.body)

            if (validation.error) {
                return response.status(400).json(validation);
            }

            const index = schedule.findIndex(element => element.id === id);

            if (index !== -1) { 
                schedule[index] = {id, name, birthDate, schedulingDateTime, attended};
                
                return response.json(schedule[index]);
            }
        } catch (error) {
            return response.status(404).send({message: "Fail to update schedule"});
        }

    }

    remove (request, response) {
        
        const id = request.params.id;
        const index = schedule.findIndex(element => element.id === id);

        if (index !== -1) {
            schedule.splice(index, 1);

            return response.json({message: "Cancelled schedule"});
        }
        return response.status(404).send({message: "Schedule not found"});
    }
}

export default ScheduleController;