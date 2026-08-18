// import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type Thread = {
  id: number;
  title: string;
  author: string;
  body: string;
  createdAt: Date;
};

// @Entity()
// export class Thread {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   title: string;

//   @Column()
//   author: string;

//   @Column()
//   body: string;

//   @Column()
//   createdAt: Date;
  
// }