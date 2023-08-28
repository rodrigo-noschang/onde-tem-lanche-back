export class NotImageOwnerError extends Error {
    message = 'apenas quem cadastrou a imagem pode removê-la';

    constructor() {
        super();
    }
}