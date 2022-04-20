import crypto from "crypto";
import dayjs from "dayjs";
import * as yup from "yup";
import dotenv from 'dotenv';

dotenv.config();

const schedule = [];

const date = [];
const day = [];
//const time = [];

function currentDates (chosenDate) { //data escolhida

    //Dados sobre o momento atual
    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const currentHour = new Date().getHours();
   
    const dayHour = chosenDate[chosenDate.length-1].split(" "); //separa o dia da hora
    const chosenHour = dayHour[1].split(":"); //pegando a hora sem os minutos

    chosenDate.pop(); //retira a última posição
    chosenDate.push(dayHour[0]) //adicionando somente o dia na última posição
    console.log(Number(chosenDate[1]))

    if ((Number(chosenDate[0]) < Number(currentYear)) ||
        (Number(chosenDate[1]) < Number(currentMonth)+1) ||
        chosenDate[2] < currentDay){
        
            console.log("não pode")
            return false;

    } else {
        console.log("entra aqui?")
       
        if (Number(chosenHour[0]) <= Number(currentHour) && 
            ((Number(chosenDate[1]) <= Number(currentMonth)+1) &&
            chosenDate[2] <= currentDay)){ //só pode hora a partir da hora atual
            
                console.log("HORA INVALIDA")
            return false;
        }
    }


    console.log("dia: " + currentDay)
    console.log("hora: " + currentHour)
    console.log("mes: " + currentMonth)
    console.log("ano: " + currentYear)
    console.log("hora q escolhi: " + chosenHour[0])

    return true;
}


function scheduleSlots(schedulingDateTime) {
    console.log("chegando aqui")

    if (date.filter(element => element.dateTime === schedulingDateTime).length >= 2 ||
        day.filter(element => element.day === (schedulingDateTime.split(" ")[0])).length >= 20){
        return false;
    }

    const chosenDate = schedulingDateTime.split("/");
    
    if(!currentDates(chosenDate)) {
        console.log("DATA ULTRAPASSADAAAAAAAAAA, escolha outra")
        return response.status(400).send({message: "Fail to store entity Schedule"});
    }

    date.push({dateTime: schedulingDateTime});
    //time.push({time: schedulingTime});
    console.log("Date:")
    console.log(date)

    day.push({day: schedulingDateTime.split(" ")[0]})
    console.log('day')
    console.log(day)
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

            const validation = schema.validate({
                name,
                birthDate,
                schedulingDateTime,
                attended
            });

            if (validation.error) {
                return response.status(400).json(validation);
            }

            if (!(scheduleSlots(schedulingDateTime))){
                return response.status(400).send({message: "Fail to store entity Schedule: invalid date"});
            }
                //const chosenTime = time.filter(element => element.time === schedulingTime);
                // console.log(chosenTime)
                const chosenDateTime = date.filter(element => element.dateTime === schedulingDateTime);
                const limitDay = day.filter(element => element.day === schedulingDateTime.split(" ")[0])


                console.log("chosenDateTime:");
                console.log(chosenDateTime);
                console.log("limitday");
                console.log(limitDay);

            if (chosenDateTime.length <= 2 && limitDay.length <= 20) {

                // console.log(date)
                // console.log(time)
                schedule.push({id,
                    name,
                    birthDate: dayjs(birthDate).format('YYYY/MM/DD'),
                    schedulingDateTime: dayjs(schedulingDateTime).format('YYYY/M/D HH:mm'),
                    //schedulingTime,
                    attended: false
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