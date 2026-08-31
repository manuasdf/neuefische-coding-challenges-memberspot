import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';

@Entity()
export class Thread {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({default: "Empty title"})
  title!: string;

  @Column({default: "Author placeholder"})
  author!: string;

  @Column({default: "Empty body text"})
  body!: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @OneToMany(() => Comment, (comment) => comment.thread)
  comments!: Comment[]
  
}