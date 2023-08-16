export class PhoneAlreadyRegisteredError extends Error {
    message = 'Numero de telefone já registrado'

    constructor() {
        super();
    }
}