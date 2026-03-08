import { Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { SongsService } from './songs.service';
import { MyParseIntPipe, ParseUserIdPipe } from 'src/pipes/parse-int.pipe';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { PracticeGuard } from 'src/guards/practice.guard';
import { MaximumSongPlays } from 'src/decorators/max-song-plays.decorator';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { ChoppedInterceptor, MapDataToObject } from 'src/interceptors/map-data-to-object.interceptor';

@Controller('songs')
export class SongsController {
    constructor(private readonly songsService: SongsService) {}

    @Post()
    create(){
        return this.songsService.create("cr0bb - 16")
    }

    // findAll, findOne, update, delete,
    @Get()
    @UseInterceptors(LoggingInterceptor, MapDataToObject, ChoppedInterceptor)
    findAll() {
        return {
            message: "all songs"
        }
    }

    // lemme use my own parse_int_pipe
    @Get(':id')
    findOne(@Param('id', new MyParseIntPipe()) id: string) {
        return {
            "message": "Here is the song: " + id
        }
    }

    // Lemme test my custom pipe that checks if user id is 10 chars 
    // and returns it with the right format
    // lemme also use an authguard
    @Get('user/:id')
    @UseGuards(AuthGuard)
    getUserWithId(@Param('id', new ParseUserIdPipe()) id: string): {message: string} {
        return {
            message: `User is right here: ${id}`
        }
    }

    @Put(':id')
    update() {
        return {
            "message": "The song has been updated"
        }
    }

    @Delete(":id")
    @Roles(['admin', 'devman']) // my custom decorator created with Reflector from nest core package
    delete() {
        return {
            message: "The song has been deleted"
        }
    }

    @Get('play/:id')
    @UseGuards(PracticeGuard)
    @MaximumSongPlays(2)
    playSong(@Param('id', ParseIntPipe) id: number) {
        return {
            message: "Playing the selected song: " + String(id)
        }
    }
}
