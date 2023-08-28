export class CustomerNotFoundError extends Error {
    message = 'cliente não encontrado';

    constructor() {
        super();
    }
}