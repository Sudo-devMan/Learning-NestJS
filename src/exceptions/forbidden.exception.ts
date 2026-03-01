import { HttpException, HttpStatus } from "@nestjs/common";

export class ForbiddenBruhException extends HttpException {
    constructor() {
        super('Broski be forbidden', HttpStatus.FORBIDDEN)
    }
}
