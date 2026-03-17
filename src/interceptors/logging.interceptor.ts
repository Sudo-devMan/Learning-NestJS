import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log("Before...")

        const now = Date.now()
        return next.handle().pipe(tap(() => console.log("After: ", Date.now() - now)))
    }
}

@Injectable()
export class MyInt implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log("1. This is just an interceptor that I just made for ptactice");

        return next.handle().pipe(tap(() => console.log("2. This is the final run to be run")))
    }
}
