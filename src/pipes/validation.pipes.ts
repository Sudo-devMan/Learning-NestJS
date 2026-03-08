import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import z from "zod";
import { ZodSchema, ZodTypeAny } from "zod/v3";

@Injectable()
export class MyValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value
        }
        const object = plainToInstance(metatype, value);
        const errors = await validate(object)
        if (errors.length > 0) {
            return new BadRequestException("Could not validate thy input")
        }
        return value
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Number, Array, Boolean, Object]
        return !types.includes(metatype)
    }
}

export class MyZodSchemeValidator implements PipeTransform {
    constructor(private schema: ZodTypeAny) {}

    transform(value: unknown, argument: ArgumentMetadata) {
        try {
            const parsedValue = this.schema.parse(value)
            return parsedValue
        } catch (err) {
            throw new BadRequestException('The value cannot be parsed, \'tis a shame.')
        }
    }
}

export const createBookSchema = z.object({
    name: z.string(),
    author: z.string(),
    price: z.number()
})
export type CreateBookPipeDto = z.infer<typeof createBookSchema>

