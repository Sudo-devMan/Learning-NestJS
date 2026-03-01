import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(BadRequestException)
export class AnotherExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const status = exception.getStatus()

        response.send(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            url: request.url
        })
    }
}
