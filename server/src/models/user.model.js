const userSchema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "description": "Nome do usuário"
        },
        "type": {
            "type": "string",
            "description": "Tipo de usuário"
        },
        "email": {
            "type": "string",
            "description": "Email do usuário"
        },
        "password": {
            "type": "string",
            "description": "Senha do usuário"
        },
        "photoURL": {
            "type": "string",
            "description": "https://picsum.photos/id/237/100/150"
        },
        "status": {
            "type": "string",
            "description": "Status do usuário"
        }
    },
    "required": [
        "name",
        "type",
        "email",
        "password",
        "photoURL",
        "status"
    ]
}

module.exports = {
    userSchema
}