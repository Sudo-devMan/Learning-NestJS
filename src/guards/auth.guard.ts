
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        return this.validateRequest(request)
    }

    // This function is for neutralizing the error that I get when I try to use the validateRequest funtion
    // it is not defined anywhere, the documentation is just bugging
    validateRequest(req: any): boolean {
        // console.log("This is the request in the Guard: ", req)
        return true
    }
}
