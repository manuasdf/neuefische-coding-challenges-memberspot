import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ThreadsService } from './threads.service';
import { ThreadsController } from './threads.controller';
import { Thread } from './entities/thread.entity';
import { Comment } from '../comments/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Thread, Comment])
  ],
  controllers: [ThreadsController],
  providers: [ThreadsService],
})
export class ThreadsModule {}
