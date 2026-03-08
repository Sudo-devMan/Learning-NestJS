import { BadRequestException, Body, Controller, ForbiddenException, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, UseFilters, UsePipes } from '@nestjs/common';
import { CreateBookDto } from './dtos/create-book.dto';
import { BooksService } from './books.service';
import { Book } from './interfaces/book.interface';
import { ForbiddenBruhException } from 'src/exceptions/forbidden.exception';
import { BadBruhException } from 'src/exceptions/bad.exception';
import { AnotherExceptionFilter } from 'src/filters/another.filter';
import { createBookSchema, MyValidationPipe, MyZodSchemeValidator, type CreateBookPipeDto } from 'src/pipes/validation.pipes';

@Controller('books')
// you can also UseFilters controller-scoped
export class BooksController {
  constructor(private bookService: BooksService) {}
  @Get()
  async findAll(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Get('pipe/:id')
  testingAPipe(@Param('id', ParseIntPipe) id: number) {
    return "This opne works as expected: " + String(id)
  }

  @Get('pipe/2/:id')
  testingAPipe2(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number) {
    return {
      "bruh": "All's well that ends well",
      "input": id
    }
  }

  @Post()
  async create(@Body(new MyValidationPipe()) body: CreateBookDto) {
    return this.bookService.create(body);
  }

  @Get('songs')
  allSongs() {
    return this.bookService.songs();
  }

  @Get('bruh')
  bruh() {
    return {
      bruh: "Bruh, this is the bruh  function :)"
    }
  }

  @Get('edit/:id')
  getOne(@Param('id', ParseIntPipe) id: string) {
    try {
      return this.bookService.findAll()
    } catch (err) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        bruh: "It was never supposed to go error"
      }, HttpStatus.BAD_REQUEST,
    {
      cause: "You dumb af " + err.toString()
    })
    }
  }

  @Post('post')
  postSumn() {
    throw new BadRequestException('This is passed into new Error (message)', {
      cause: new Error(),
      description: "This 400 is passed into the error"
    })
  }

  @Get('some')
  someBooks() {
    throw new ForbiddenException('You do not have permission',
      {
        cause: new Error(),
        description: "This error bruh it is wild"
      }
    )
  }

  @Get('custom')
  customException() {
    throw new ForbiddenBruhException();
  }

  @Get('bad')
  @UseFilters(AnotherExceptionFilter)
  badBruh() {
    throw new BadBruhException();
  }


  // THE ERROR HERE IS JUST STRESSFUL AND TIME-CONSUMING TO DEAL WITH, SEE YOU IN MONTHS OF EXPERIENCE
  // @Post('new')
  // @UsePipes(new MyZodSchemeValidator(createBookSchema))
  // async createNewBook(@Body() data: CreateBookPipeDto) {
  //   this.bookService.create(data)
  // }
}

// In the options, the cause can also be an error caught by exception handling 
// with try-catch blocks
// Custom messages only work if there is a try-catch block
