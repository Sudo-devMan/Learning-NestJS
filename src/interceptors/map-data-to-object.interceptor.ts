import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

export interface Response<T> {
    data: T
}

@Injectable()
export class MapDataToObject<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        return next.handle().pipe(map(data => ({data})))
    }
}





export interface MyChoppedResponse<T> {
    chopped: T
}

@Injectable()
export class ChoppedInterceptor<T> implements NestInterceptor<T, MyChoppedResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler) {
        console.log("This is my chopped interceptor")

        return next
            .handle()
            .pipe(map(chopped => ({chopped})))
    }
}

