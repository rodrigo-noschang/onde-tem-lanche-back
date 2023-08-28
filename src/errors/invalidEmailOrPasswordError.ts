export class InvalidEmailOrPassword extends Error {
    message = "Email ou senha invalidos"

    constructor() {
        super();
    }
}