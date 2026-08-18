import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(private readonly CommentsRepository: CommentsRepository) {}

  findOne(id: number) {
    if (id === undefined) {
      throw new Error("No id found");
    }
    
    const comment = this.CommentsRepository.findOne(id);
    if (!comment)
      throw new NotFoundException("No comment found")
    
    return comment;
  }

  remove(id: number) {
    if (id === undefined) {
      throw new Error("No id found");
    }
    
    let comment = this.CommentsRepository.findOne(id);
    if (!comment)
      throw new NotFoundException("No comment found")

    comment.body = "deleted";
    const updateComment = this.CommentsRepository.update(id, comment);
    return updateComment;
  }
}
