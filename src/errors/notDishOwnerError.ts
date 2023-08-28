export class NotDishOwnerError extends Error {
    message = 'essa operação só é permitida para o criador do prato';

    constructor() {
        super();
    }
}