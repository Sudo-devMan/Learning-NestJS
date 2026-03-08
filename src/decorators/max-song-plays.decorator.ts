import { Reflector } from "@nestjs/core";

export const MaximumSongPlays = Reflector.createDecorator<number>()
