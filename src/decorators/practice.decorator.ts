import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Bruh = createParamDecorator((data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    return {broski: "This Broski bruh"}
})

// the data parameter is what you pass into the decorator as arguments 
// which can be used in process of the decorator function
export const Skills = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        return data
    }
)
