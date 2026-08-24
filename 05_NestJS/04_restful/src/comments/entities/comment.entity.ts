import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Thread } from '../../threads/entities/thread.entity';

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ default: "Author placeholder" })
  author!: string;

  @Column({ default: "Empty body text" })
  body!: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @ManyToOne(() => Thread, (thread) => thread.comments, {
    onDelete: 'CASCADE'
  })
  thread!: Thread;
  
}