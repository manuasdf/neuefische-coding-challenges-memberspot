import { Module } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { ThreadsController } from './threads.controller';
import { ThreadsRepository } from './threads.repository';
import { CommentsModule } from '../comments/comments.module';

@Module({
  imports: [CommentsModule],
  controllers: [ThreadsController],
  providers: [ThreadsService, ThreadsRepository],
})
export class ThreadsModule {}
