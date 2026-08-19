import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly comments: Repository<Comment>
  ) {}

  findOne(id: string) {
    if (id === undefined)
      throw new Error("No id found");
    
    const comment = this.comments.findOneBy({id});
    if (!comment)
      throw new NotFoundException("No comment found")
    
    return comment;
  }

  async remove(id: string) {
    if (id === undefined) {
      throw new Error("No id found");
    }
    
    let comment = await this.comments.findOneBy({id});
    if (!comment)
      throw new NotFoundException("No comment found")

    comment.body = "deleted";
    const updateComment = await this.comments.save(comment);
    return updateComment;
  }
}
