import {
  Controller,
  Get,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
  UseGuards,
  Req
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentResponseDto } from './dto/comment-response.dto';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // Get one comment
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  @ApiOperation({ summary: 'Returns comment' })
  @ApiOkResponse({ description: 'Returns the comment with the given ID' })
  @ApiUnauthorizedResponse({ description: 'No valid JWT token provided' })
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
  @ApiOperation({ summary: 'Redacts a comment' })
  @ApiOkResponse({ description: 'Returns the redacted comment' })
  @ApiUnauthorizedResponse({ description: 'No valid JWT token provided' })
  async remove(@Param('id', ParseUUIDPipe) id: string, @Req() req: any) {
    const comment = await this.commentsService.remove(id, req.user);

    if (!comment)
      throw new NotFoundException("Comment not found")

    return plainToInstance(CommentResponseDto, comment, {
      excludeExtraneousValues: true,
    });
  }
}
