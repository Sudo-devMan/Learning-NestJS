import { IsInt, IsString } from "class-validator";

export class CreateBookDto {
  @IsString()
  name: string;

  @IsString()
  author: string;

  @IsInt()
  price: number;
}
