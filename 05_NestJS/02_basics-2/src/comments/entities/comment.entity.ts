// import { Entity, Column, PrimaryGeneratedColumn, ForeignKey } from 'typeorm';
// import { Thread } from '../../threads/entities/thread.entity';

export type Comment = {
  id: number;
  threadId: number;
  author: string;
  body: string;
  createdAt: Date;
};

// @Entity()
// export class Comment {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ForeignKey(() => Thread)
//   threadId: number;

//   @Column()
//   author: string;

//   @Column()
//   body: string;

//   @Column()
//   createdAt: Date;
  
// }