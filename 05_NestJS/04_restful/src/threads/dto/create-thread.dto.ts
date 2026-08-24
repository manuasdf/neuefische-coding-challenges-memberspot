import {
  IsString,
  IsNotEmpty,
  IsDate,
  MaxLength,
} from "class-validator";

export class CreateThreadDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title!: string;

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