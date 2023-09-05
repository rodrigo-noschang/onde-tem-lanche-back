export class InvalidImageNameError extends Error {
    message = 'nome da imagem inválido';

    constructor() {
        super();
    }
}