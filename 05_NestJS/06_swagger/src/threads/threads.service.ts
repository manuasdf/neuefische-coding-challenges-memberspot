import { BadRequestException, Injectable, NotFoundException, Query, UnauthorizedException } from '@nestjs/common';
import { Thread } from './entities/thread.entity';
import { Comment } from '../comments/entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ThreadsService {
  constructor(
    @InjectRepository(Thread)
    private readonly threads: Repository<Thread>,
    @InjectRepository(Comment)
    private readonly comments: Repository<Comment>
  ) {}

  async create(newThread: CreateThreadDto): Promise<Thread> {
    if (!newThread || !newThread.title)
      throw new BadRequestException("No title in thread found");

    if (!newThread || !newThread.body)
      throw new BadRequestException("No body in thread found");

    const thread = this.threads.save(newThread);
    return thread;
  }

  async update(id: string, updateThread: UpdateThreadDto, user: User): Promise<Thread> {
    if (!updateThread || !updateThread.title)
      throw new NotFoundException("No title found");

    if (!updateThread || !updateThread.body)
      throw new NotFoundException("No body found");

    const threadOriginal = await this.threads.findOneBy({ id });

    if (threadOriginal?.author !== user.username)
      throw new UnauthorizedException("No rights to edit thread");

    const thread = await this.threads.save({...threadOriginal, ...updateThread});
    return thread;
  }

  async findAll(paginationQuery: PaginationQueryDto): Promise<any> {
    const { page, limit } = paginationQuery;
    const [data, total] = await this.threads.findAndCount({
          skip: (page - 1) * limit,
          take: limit
        })

    if (!data) 
      throw new NotFoundException("Thread not found")

    return { 
      data, 
      meta: { 
        page, 
        limit, 
        total, 
        totalPages: Math.ceil(total / limit) } 
    }
  }

  async findOne(id: string): Promise<Thread[] | null> {
    if (id === undefined)
      throw new BadRequestException("Id not found");

    const thread = await this.threads.find({
      where: {id}, 
      relations: {
        comments: true,
      }
    });
    if (!thread)
      throw new NotFoundException("Thread not found");

    return thread;
  }

  async addComment(id: string, newComment: CreateCommentDto): Promise<Comment> {
    if (id === undefined)
      throw new BadRequestException("No id found");

    const thread = await this.threads.findOneBy({id});
    if (!thread)
      throw new NotFoundException("Thread not found");

    const newElement = new Comment();
    Object.assign(newElement, newComment, { thread });

    const comment = this.comments.save(newElement);
    return comment;
  }

  async remove(id: string, user: User): Promise<void> {
    if (id === undefined)
      throw new BadRequestException("No id found");

    const thread = await this.threads.findOneBy({id});

    if (thread?.author !== user.username)
      throw new UnauthorizedException("No rights to delete thread");

    if (!thread)
      throw new NotFoundException("Thread not found");

    this.threads.remove(thread);
  }
}
