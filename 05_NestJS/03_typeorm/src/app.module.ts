import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { NestFactory } from "@nestjs/core";
import { CommentsModule } from "./comments/comments.module";
import { ThreadsModule } from './threads/threads.module';
import { Comment } from './comments/entities/comment.entity';
import { Thread } from './threads/entities/thread.entity';

@Module({
  imports: [
    CommentsModule, 
    ThreadsModule,
    TypeOrmModule.forRoot({
        type: "better-sqlite3",
        database: "data/chat.sqlite",
        entities: [Comment, Thread],
        synchronize: true,
        logging: false,
        enableWAL: true,
        statementCacheSize: 100,
      })
    ]
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3232);
  console.log(`Server is running on port ${await app.getUrl()}`);
}

bootstrap();
