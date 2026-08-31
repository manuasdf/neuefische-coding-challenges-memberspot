import { IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["username"])
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @IsString()
  username!: string

  @IsString()
  passwordHash!: string
}
