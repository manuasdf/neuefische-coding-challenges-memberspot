import { Injectable, NotFoundException } from '@nestjs/common';
import { Thread } from './entities/thread.entity';
import { Comment } from '../comments/entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ThreadsService {
  constructor(
    @InjectRepository(Thread)
    private readonly threads: Repository<Thread>,
    @InjectRepository(Comment)
    private readonly comments: Repository<Comment>
  ) {}

  create(newThread: Thread) {
    if (!newThread || !newThread.title)
      throw new Error("No title in thread found");

    if (!newThread || !newThread.body)
      throw new Error("No body in thread found");

    const thread = this.threads.save(newThread);
    return thread;
  }

  findAll() {
    const threads = this.threads.find();
    if (!threads) 
      throw new NotFoundException("No thread found")

    return threads;
  }

  findOne(id: string) {
    if (id === undefined)
      throw new Error("No id found");

    const thread = this.threads.find({
      where: {id}, 
      relations: {
        comments: true,
      }
    });
    if (!thread)
      throw new NotFoundException("No thread found");

    return thread;
  }

  async addComment(id: string, newComment: any) {
    if (id === undefined)
      throw new Error("No id found");

    const thread = await this.threads.findOneBy({id});
    if (!thread)
      throw new NotFoundException("No thread found");

    const newElement = new Comment();
    Object.assign(newElement, newComment, { thread });

    const comment = await this.comments.save(newElement);
    return comment;
  }

  async remove(id: string) {
    if (id === undefined)
      throw new Error("No id found");

    const thread = await this.threads.findOneBy({id});

    if (!thread)
      throw new NotFoundException("No thread found");

    await this.threads.remove(thread);
  }
}
