export class EmailAlreadyRegisteredError extends Error {
    message = 'Email já cadastrado';

    constructor() {
        super();
    }
}