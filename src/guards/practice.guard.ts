import { CanActivate, ExecutionContext, ForbiddenException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { MaximumSongPlays } from "src/decorators/max-song-plays.decorator";

@Injectable()
export class PracticeGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext) {
        const maxPlays = this.reflector.get(MaximumSongPlays, context.getHandler())
        if (!maxPlays) {
            return true
        }
        const request = context.switchToHttp().getRequest()
        try {
            const user = request.user
            const userPlays = user.plays

            if (userPlays > MaximumSongPlays) {
                throw new ForbiddenException("You have reached maximum song plays for the day! Please upgrade to premium to keep playing.")
            }
        } catch (err) {
            throw new HttpException('User is not authenticated!', 401)
        }
        console.log("This is the request user: ", request.user)
        return true
    }
}