export class CreateCommentDto {
  id!: number;
  threadId!: number;
  author!: string;
  body!: string;
  createdAt!: Date;
}
