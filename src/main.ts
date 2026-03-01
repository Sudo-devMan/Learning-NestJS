import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  // app.use(someMiddlewareYouWannaUseGlobally)
  // app.useGlobalFilters(someExceptionFiltersForGlobalUse)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
