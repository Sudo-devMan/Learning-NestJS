import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

// User functional middlewqare if your middleware does not need any dependencies
// dependencies shall be added like in controllers and services via contructor()
// yep, type shii

export function booksMiddlewareFunction(req: Request, res: Response, next: NextFunction) {
    console.log("This is the functional books middleqare bruh!")
    next()
}

@Injectable()
export class BooksMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log("Class middleware used!!")
        next()
    }
}

