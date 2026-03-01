
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { SongsModule } from 'src/songs/songs.module';
import { BooksMiddleware, booksMiddlewareFunction } from 'src/common/middleware/books.middleware';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

// you can provide app filter and useClass of exception filter you wish to apply
// to all controllers globally
// it does not matter in which module you apply this
// it will apply to all controllers globally
@Module({
  controllers: [BooksController],
  providers: [BooksService, {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter
  }],
  imports: [SongsModule]
})
export class BooksModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    // you can add more middleware in the apply function (comma-separated)
    consumer.apply(BooksMiddleware, booksMiddlewareFunction).exclude('books/bruh').forRoutes('books')
  }
}
