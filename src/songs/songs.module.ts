import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { SongsMiddlewre } from 'src/common/middleware/songs.middleware';

@Module({
  controllers: [SongsController],
  providers: [SongsService],
  exports: [SongsService]
})
export class SongsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SongsMiddlewre)
      .exclude(
        {path: 'songs/create', method: RequestMethod.POST},
        'songs/{*breathe}'
      )
      .forRoutes({
      path: 'songs/*bruh', // this wildcard says apply middleware for all routes starting with songs/ 
      method: RequestMethod.POST
    })
  }
}

// wrap the wildcard in braces to makle it optional
// to apply the middleware for a controller, simply forRoutes(ControllerClass)