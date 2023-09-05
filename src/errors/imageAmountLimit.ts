export class ImageAmountLimitError extends Error {
    message = 'Limites de imagens atingido';

    constructor() {
        super();
    }
}