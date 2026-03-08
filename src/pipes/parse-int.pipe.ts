
import { Injectable, ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common'

@Injectable()
export class MyParseIntPipe implements PipeTransform<string, number>{
    transform(value: string, matadata: ArgumentMetadata): number {
    	const val = parseInt(value, 10)
	if (isNaN(val)) {
	    throw new BadRequestException('The value is not a number, bruh!')
	}
	return val
    }
}

@Injectable()
export class ParseUserIdPipe implements PipeTransform<any> {
	transform(value: string, metadata: ArgumentMetadata) {
		if (value.length !== 10) {
			throw new BadRequestException('The user ID should be 10 chars long')
		}
		return `userID_${value.toLowerCase()}`
	}
}
