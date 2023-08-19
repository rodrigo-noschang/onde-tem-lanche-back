export class DishNotFoundError extends Error {
    message = 'dish não encontrado'

    constructor() {
        super();
    }
}