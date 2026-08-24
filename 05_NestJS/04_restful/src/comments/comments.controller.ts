import { Controller, Get, Param, Delete, ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentResponseDto } from './dto/comment-response.dto';
import { plainToInstance } from 'class-transformer';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // Get one comment
  @Get(":id")
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    const comment = this.commentsService.findOne(id);

    if (!comment)
      throw new NotFoundException("Comment not found")

    return plainToInstance(CommentResponseDto, comment, {
      excludeExtraneousValues: true,
    });
  }

  // // Special: Does not delete the comment, but sets its body to “deleted”
  @Delete(":id")
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const comment = await this.commentsService.remove(id);

    if (!comment)
      throw new NotFoundException("Comment not found")

    return plainToInstance(CommentResponseDto, comment, {
      excludeExtraneousValues: true,
    });
  }
}
