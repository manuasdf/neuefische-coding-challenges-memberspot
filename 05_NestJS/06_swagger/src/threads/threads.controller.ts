import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
  HttpStatus,
  HttpCode,
  Query,
  UseGuards,
  Req
} from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { plainToInstance } from 'class-transformer';
import { ThreadResponseDto } from './dto/thread-response.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new thread' })
  @ApiOkResponse({ description: 'Returns successfully saved thread' })
  @ApiUnauthorizedResponse({ description: 'No valid JWT token provided' })
  async create(@Req() req: any, @Body() createThread: CreateThreadDto) {
    const threads = await this.threadsService.create({...createThread, author: req.user.username});
    if (!threads) 
      throw new NotFoundException("Thread not created")
    return plainToInstance(ThreadResponseDto, threads, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Return all threads' })
  @ApiOkResponse({ description: 'Return list of threads with meta information for pagination' })
  @ApiUnauthorizedResponse({ description: 'No valid JWT token provided' })
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    const {data, meta} = await this.threadsService.findAll(paginationQuery);
    return {
      data: plainToInstance(ThreadResponseDto, data, {
        excludeExtraneousValues: true,
      }),
      meta
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Return one thread' })
  @ApiOkResponse({ description: 'Returns a thread with its comments' })
  @ApiUnauthorizedResponse({ description: 'No valid JWT token provided' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const threads = await this.threadsService.findOne(id);
    if (!threads) 
      throw new NotFoundException("Thread not found")
    return plainToInstance(ThreadResponseDto, threads, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update one thread' })
  @ApiOkResponse({ description: 'Returns an updated thread' })
  @ApiUnauthorizedResponse({ description: 'No valid JWT token provided' })
  async update(@Param('id', ParseUUIDPipe) id: string, @Req() req: any, @Body() updateThread: UpdateThreadDto) {
    const threads = await this.threadsService.update(id, updateThread, req.user);
    if (!threads) 
      throw new NotFoundException("Thread not updated")
    return plainToInstance(ThreadResponseDto, threads, {
      excludeExtraneousValues: true,
    });
  }

  @Post(":id/comments")
  @ApiOperation({ summary: 'Add comment to thread' })
  @ApiOkResponse({ description: 'Returns an updated thread' })
  @ApiUnauthorizedResponse({ description: 'No valid JWT token provided' })
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
  @ApiOperation({ summary: 'Remove a thread and its comments' })
  @ApiUnauthorizedResponse({ description: 'No valid JWT token provided' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string, @Req() req: any) {
    return await this.threadsService.remove(id, req.user);
  }
}
