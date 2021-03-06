const surveySchema = {
    "type": "object",
    "properties": {
        "nome": {
            "type": "string",
            "description": "Nome da referida pessoa"
        },
        "title": {
            "type": "string",
            "description": "Projetos da parceria PUC/DTI"
        },
        "date": {
            "type": "string",
            "format": "date",
            "description": "2019-05-14"
        },

        "startTime": {
            "type": "string",
            "format": "date-time",
            "description": "T13:00:00"
        },
        "endTime": {
            "type": "string",
            "format": "date-time",
            "description": "T15:00:00"
        },
        "surveyEndDate": {
            "type": "string",
            "format": "date",
            "description": "2019-05-26"
        },
        "numberWinners": {
            "type": "integer",
            "description": "12"
        },
        "address": {
            "type": "string",
            "description": "Rua dos Bobos, Nº 0"
        },
        "city": {
            "type": "string",
            "description": "Belo Horizonte"
        },
        "state": {
            "type": "string",
            "minLength": 2,
            "maxLength": 2,
            "description": "MG"
        },
        "userId": {
            "type": "any",
            "description": ""
        },
        "photoURL": {
            "type": "string",
            "description": "https://api.com.br/imagem_id"
        },
    },
    "required": [
        "title",
        "date",
        "startTime",
        "endTime",
        "address",
        "city",
        "userId",
        "state"
    ]
}

module.exports = {
    surveySchema
}