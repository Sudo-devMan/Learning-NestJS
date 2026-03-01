import { HttpException, HttpStatus } from "@nestjs/common";

export class BadBruhException extends HttpException {
    constructor() {
        super("The data you provided cannot be parsed bruh!!", HttpStatus.BAD_REQUEST)
    }
}
