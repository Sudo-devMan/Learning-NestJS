import { Injectable } from '@nestjs/common';
import { Book } from './interfaces/book.interface';
import { SongsService } from 'src/songs/songs.service';

@Injectable()
export class BooksService {
    constructor(private readonly songsService: SongsService) {}

    songs(): string[] {
        return this.songsService.findAll()
    }

    private readonly books: Book[] = []

    create(book: Book) {
        this.books.push(book)
    }

    findAll(): Book[] {
        throw new Error('Bruh this be an Error!!')
    }
}
