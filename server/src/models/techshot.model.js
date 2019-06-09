const techshotSchema = {
    "type": "object",
    "properties": {
        "title": {
            "type": "string",
            "description": "Projetos da parceria PUC/DTI"
        },
        "description": {
            "type": "string",
            "description": ""
        },
        "speaker":{
            "type": "string",
            "description": ""
        },
        "duration": {
            "type": "integer",
            "description": "12345"
        },

        "keywords": {
            "type": "array",
            "items": {
                "type":"string"
            }
        },
        "userId": {
            "type": "any",
            "description": ""
        },
        "surveyId": {
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
        "description",
        "speaker",
        "duration",
        "userId",
        "surveyId",
    ]
}

module.exports = {
    techshotSchema
}