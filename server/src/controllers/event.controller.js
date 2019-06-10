const eventRepository = require('../data/event.data');



async function listEvents(req,res) {
    try{
        var dados = await eventRepository.find({});
        res.json(dados);
    }catch(err){
        console.log(err);
        res.status (400).send (err.message);
    }
}

async function getEvent(req,res) {
    try{
        var dados = await eventRepository.findById(req.params.id);
        res.json(dados);
    }catch(err){
        if(err.name == 'CastError'){
            res.status(404).send('Evento não encontrada')
        }
        res.status (400).send (err.message);
    }
}

module.exports = {
    listEvents,
    getEvent
}