import { Injectable, NotFoundException } from '@nestjs/common';
import { ThreadsRepository } from './threads.repository';
import { Thread } from './entities/thread.entity';
import { CommentsRepository } from '../comments/comments.repository';

@Injectable()
export class ThreadsService {
  constructor(
    private readonly ThreadsRepository: ThreadsRepository,
    private readonly CommentsRepository: CommentsRepository
  ) {}

  create(newThread: Thread) {
    if (!newThread || !newThread.title) {
      throw new Error("No title in thread found");
    }

    if (!newThread || !newThread.body) {
      throw new Error("No body in thread found");
    }

    const thread = this.ThreadsRepository.create(newThread);
    return thread;
  }

  findAll() {
    const threads = this.ThreadsRepository.findAll();
    if (!threads) {
      throw new NotFoundException("No thread found")
    }
    return threads;
  }

  findOne(id: number) {
    if (id === undefined) {
      throw new Error("No id found");
    }

    const thread = this.ThreadsRepository.findOne(id);
    if (!thread)
      throw new NotFoundException("No thread found");
    const comments = this.CommentsRepository.findAllByThreadId(id);

    return {thread, comments};
  }

  addComment(id: number, newComment: any) {
    if (id === undefined) {
      throw new Error("No id found");
    }

    const thread = this.ThreadsRepository.findOne(id);
    if (!thread)
      throw new NotFoundException("No thread found");

    const comment = this.CommentsRepository.create(id, newComment);
    return comment;
  }

  remove(id: number) {
    if (id === undefined) {
      throw new Error("No id found");
    }

    this.CommentsRepository.removeAllByThreadId(id);
    this.ThreadsRepository.remove(id);
  }
}
