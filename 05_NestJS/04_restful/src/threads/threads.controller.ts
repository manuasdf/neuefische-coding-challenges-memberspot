import { Controller, Get, Post, Patch, Body, Param, Delete, ParseUUIDPipe, NotFoundException, HttpStatus, HttpCode, Query } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { plainToInstance } from 'class-transformer';
import { ThreadResponseDto } from './dto/thread-response.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  //  	Create a thread with title and body
  @Post()
  create(@Body() createThread: CreateThreadDto) {
    const threads = this.threadsService.create(createThread);
    if (!threads) 
      throw new NotFoundException("Thread not created")
    return plainToInstance(ThreadResponseDto, threads, {
      excludeExtraneousValues: true,
    });
  }

  //  	List all threads
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    const {data, meta} = await this.threadsService.findAll(paginationQuery);
    return {
      data: plainToInstance(ThreadResponseDto, data, {
        excludeExtraneousValues: true,
      }),
      meta
    }
  }

  //    Get one thread including its comments
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const threads = await this.threadsService.findOne(id);
    if (!threads) 
      throw new NotFoundException("Thread not found")
    return plainToInstance(ThreadResponseDto, threads, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateThread: UpdateThreadDto) {
    const threads = await this.threadsService.update(id, updateThread);
    if (!threads) 
      throw new NotFoundException("Thread not updated")
    return plainToInstance(ThreadResponseDto, threads, {
      excludeExtraneousValues: true,
    });
  }

  //  	Add a comment to a thread
  @Post(":id/comments")
  async addComment(@Param('id', ParseUUIDPipe) id: string, @Body() newComment: CreateCommentDto) {
    const threads = await this.threadsService.addComment(id, newComment);
    if (!threads) 
      throw new NotFoundException("Thread not found")
    return plainToInstance(ThreadResponseDto, threads, {
      excludeExtraneousValues: true,
    });
  }

  // //    Deletes the thread and all of its comments (comments are actually deleted)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.threadsService.remove(id);
  }
}
