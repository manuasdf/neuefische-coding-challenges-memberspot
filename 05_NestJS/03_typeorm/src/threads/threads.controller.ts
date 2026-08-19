import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { Thread } from './entities/thread.entity';
import { Comment } from '../comments/entities/comment.entity';

@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  //  	Create a thread with title and body
  @Post()
  create(@Body() createThread: Thread) {
    return this.threadsService.create(createThread);
  }

  //  	List all threads
  @Get()
  findAll() {
    return this.threadsService.findAll();
  }

  //    Get one thread including its comments
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.threadsService.findOne(id);
  }

  //  	Add a comment to a thread
  @Post(":id/comments")
  addComment(@Param('id') id: string, @Body() newComment: Comment) {
    return this.threadsService.addComment(id, newComment);
  }

  // //    Deletes the thread and all of its comments (comments are actually deleted)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.threadsService.remove(id);
  }
}
