import crypto from "crypto";
import dotenv from 'dotenv';

dotenv.config();

const schedule = [];

class ScheduleController { //exportando as seguintes funções, que são as 5 do CRUD:
    
    index (request, response) {
        return response.json(schedule);
    }

    getOne(request, response) {
        try {
            const id = request.params.id;
            const index = schedule.findIndex(element => element.id === id)
            return response.json(schedule[index])
        } catch (error) {
            return response.status(404).send({message: "Schedule not found"});
        }
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
            return response.status(400).send({error: error});
        }
    }

    remove (request, response) {
        try {
            const id = request.params.id;
            const index = schedule.findIndex(element => element.id === id);
            schedule.splice(index, 1);

            return response.json({message: "Agendamento cancelado"})
        } catch {
            return response.status(400).send({error: error})
        }
    }

    update (request, response) {
        try {
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

            schedule[index] = {id, name, birthDate, schedulingDate, schedulingTime, attended};
            
            return response.json(schedule[index]);
        } catch (error){
            return response.status(404).send({message: "Schedule not found"});

        }
    }
}

export default ScheduleController;