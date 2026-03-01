import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
    constructor(private readonly songsService: SongsService) {}

    @Post()
    create(){
        return this.songsService.create("cr0bb - 16")
    }

    // findAll, findOne, update, delete
    @Get()
    findAll() {
        return "all songs"
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return "Here is the song: " + id
    }

    @Put(':id')
    update() {
        return "The song has been updated"
    }

    @Delete(":id")
    delete() {
        return "The song has been deleted"
    }
}
