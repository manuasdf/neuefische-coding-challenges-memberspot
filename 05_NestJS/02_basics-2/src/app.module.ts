import { Module } from '@nestjs/common';
import { NestFactory } from "@nestjs/core";
import { CommentsModule } from "./comments/comments.module";
import { ThreadsModule } from './threads/threads.module';

@Module({
  imports: [CommentsModule, ThreadsModule]
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3232);
  console.log(`Server is running on port ${await app.getUrl()}`);
}

bootstrap();
