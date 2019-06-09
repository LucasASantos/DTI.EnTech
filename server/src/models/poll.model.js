const pollSchema = {
    "type": "object",
    "properties": {
        "userId": {
            "type": "string",
            "description": "ID do usuário"
        },
        "techShotId": {
            "type": "string",
            "description": "ID da TechShot"
        }
    },
    "required": [
        "userId",
        "techShotId"
    ]
}

module.exports = {
    pollSchema
}