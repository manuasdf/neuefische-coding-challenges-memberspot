import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly comments: Repository<Comment>
  ) {}

  async findOne(id: string): Promise<Comment | null> {
    if (id === undefined)
      throw new Error("No id found");
    
    const comment = await this.comments.findOneBy({id});
    if (!comment)
      throw new Error("No comment found")
    
    return comment;
  }

  async remove(id: string, user: User): Promise<Comment> {
    if (id === undefined) {
      throw new Error("No id found");
    }
    
    let comment = await this.comments.findOneBy({id});
    if (!comment)
      throw new Error("No comment found")

    if (comment?.author !== user.username)
      throw new UnauthorizedException("No rights to delete comment");

    comment.body = "deleted";
    const updateComment = await this.comments.save(comment);
    return updateComment;
  }
}
