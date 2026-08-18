import { Controller, Get, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // Get one comment
  @Get(":id")
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  // Special: Does not delete the comment, but sets its body to “deleted”
  @Delete(":id")
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
