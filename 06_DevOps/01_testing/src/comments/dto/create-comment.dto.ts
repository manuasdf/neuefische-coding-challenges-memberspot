import {
  IsString,
  IsNotEmpty,
  IsDate,
  MaxLength,
} from "class-validator";

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  author!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  body!: string;

  @IsDate()
  createdAt!: Date;
}