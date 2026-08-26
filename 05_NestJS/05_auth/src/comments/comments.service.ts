import { Injectable } from '@nestjs/common';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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

  async remove(id: string): Promise<Comment> {
    if (id === undefined) {
      throw new Error("No id found");
    }
    
    let comment = await this.comments.findOneBy({id});
    if (!comment)
      throw new Error("No comment found")

    comment.body = "deleted";
    const updateComment = await this.comments.save(comment);
    return updateComment;
  }
}
