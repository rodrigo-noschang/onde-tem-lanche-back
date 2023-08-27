export class RestaurantNotFoundError extends Error {
    message = 'restaurante não encontrado'

    constructor() {
        super();
    }
}