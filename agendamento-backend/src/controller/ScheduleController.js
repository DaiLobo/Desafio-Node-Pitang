import crypto from "crypto";
import dotenv from 'dotenv';

dotenv.config();

const schedule = [];

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

        return response.status(400).send({message: "Schedule not found"}); 
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

            schedule.push({id,
                name,
                birthDate,
                schedulingDate,
                schedulingTime,
                attended});

            return response.json(schedule);
            
        } catch (error) {
            return response.status(400).send({message: "Fail to store entity: Schedule"});
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

            return response.json({message: "Agendamento cancelado"})
        }
        return response.status(400).send({error: error})
    }
}

export default ScheduleController;