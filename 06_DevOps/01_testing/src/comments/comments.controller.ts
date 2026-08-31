import {
  Controller,
  Get,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
  UseGuards
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentResponseDto } from './dto/comment-response.dto';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // Get one comment
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
