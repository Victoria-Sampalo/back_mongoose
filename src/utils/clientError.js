// utils/clientError.js

class ClientError extends Error {
    constructor (message, statusCode=400){
        super(message);
        this.status=statusCode;
        this.message=message;
        this.error=true;
    }
}

module.exports={ ClientError };