
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, RequestTimeoutException } from "@nestjs/common";
import { Observable, TimeoutError, catchError, map, of, throwError, timeout } from "rxjs";

// this interceptor will return the response as all names at index 3 having all caps

export interface Response<T> {
    data: T
}

@Injectable()
export class TransformToUpper<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        return next.handle().pipe(map(data => {
            return data.map(s => s.toUpperCase())
        }))
    }
}

// The below interceptor will check if the data is gay and return an empty array, 
// else it will call the handler

@Injectable()
export class GayFilter implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const isGay = false;
        if (!isGay) {
            of(['Glad we have straight mfs'])
        }
        return next.handle()
    }
}

// Say I wanna timeout a request if x seconds pass (milliseconds passed into timeout)
@Injectable()
export class TimeOutInt implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        return next.handle().pipe(
            timeout(0.002), // 2 seconds (i set it to 2x10-3 to test workings of the interceptor but in doesn't work)
            catchError(err => {
                if (err instanceof TimeoutError) {
                    return throwError(() => new RequestTimeoutException())
                }
                return throwError(() => err)
            })
        )
    }
}
