export class ImageAmountLimitError extends Error {
    message = 'Limites de imagens atingido (até 4 images)';

    constructor() {
        super();
    }
}