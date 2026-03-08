import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Roles } from "src/decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get(Roles, context.getHandler())
        if (!roles) {
            return true
        }

        const request = context.switchToHttp().getRequest()
        const user = request.user
        return this.checkRoles(roles, user.roles)
    }

    // This function is just my own way of how I would go about checking user roles
    checkRoles(roles: string[], userRoles: string[]): boolean {
        if (!userRoles) {
            return false
        }
        let cases: number=0;
        for (let i=0; i<userRoles.length; i++) {
            if (roles.includes(userRoles[i])) {
                cases++;
            }
        }
        return cases > 0;
    }
}
