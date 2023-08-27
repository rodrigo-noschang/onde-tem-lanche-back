export class NotDishOwnerError extends Error {
    message = 'apenas o criador do prato pode deletá-lo'

    constructor() {
        super();
    }
}