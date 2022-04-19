import dotenv from 'dotenv';

dotenv.config();

const schedule = [];

class ScheduleController { //exportando as seguintes funções, que são as 5 do CRUD:
    
    index (request, response) {
        app.get('/', (request, response) => {
            response.json({message: "Tudo ok por aqui!", dados: schedule});
          })
    }

    store (request, response) {
        app.post("/schedule", (request, response) => {
            console.log("Agendamento realizado");
            //salvando os dados em memória
            schedule.push({
              name: request.body,
              birthDate: request.body,
              schedulingDate: request.body,
              schedulingTime: request.body,
              attended: request.body,
            });
            response.json({message: "Tudo certo", dados: schedule})
          });
        response.send(schedule);
    }

    remove (request, response) {
        const {id} = request.params;
        //const schedule = await ScheduleModel.findById(id);
    
        if (schedule){
            schedule.remove();
            return response.send({message: "schedule deleted"});
        }
        
        response.status(404).send({message: "schedule not found"});
    }

    update (request, response) {
        const {id} = request.params;
        //validação nos campos
        //const {nome, email, password, phones} = request.body;

        // const schedule = await ScheduleModel.findByIdAndUpdate(
        //     id,
        //     {
        //     name,
        //     birthDate,
        //     schedulingDate,
        //     schedulingTime,
        //     attended,
        //     }
        // );
        
        if(!schedule){
            return response.status(404).send({message: "schedule not found"});
        }

        response.send({ schedule });
    
    }
}

export default ScheduleController;