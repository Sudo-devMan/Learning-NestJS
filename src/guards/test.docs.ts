
// This file is used to paste buggy code from the docs to see if it is really buggy



//              1. validateRequest is not anywhere defined

// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();
//     return validateRequest(request);
//   }
// }
