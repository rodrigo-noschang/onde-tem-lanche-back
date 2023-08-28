export class ImageNotFoundError extends Error {
    message = 'imagem não encontrada';

    constructor() {
        super();
    }
}