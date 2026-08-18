import { Injectable } from '@nestjs/common';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsRepository {
    private static comments: Map<number, Comment> = new Map<number, Comment>();
    private static currentId: number = 0;

    create(threadId: number, newComment: Partial<Comment>) {
        let comment = newComment;
        comment.threadId = threadId;
        comment.createdAt = new Date
        CommentsRepository.comments.set(CommentsRepository.currentId, comment as Comment);
        CommentsRepository.currentId++;
    }

    findAll(): Comment[] {
        const allComments: Comment[] = [];
        CommentsRepository.comments.forEach((value, key) => {
            allComments.push({...value, id: key});
        });
        return allComments;
    }

    findAllByThreadId(id: number): Comment[] {
        const allComments: Comment[] = [];
        CommentsRepository.comments.forEach((value, key) => {
            if(value.threadId === id)
                allComments.push({...value, id: key});
        });
        return allComments;
    }

    findOne(id: number): Comment | undefined {
        return CommentsRepository.comments.get(id);
    }

    update(id: number, updateComment: Comment) {
        if (!CommentsRepository.comments.has(id)) {
            throw new Error(`No comment with ${id} found.`);
        }
        CommentsRepository.comments.set(id, updateComment);
    }

    remove(id: number) {
        if (!CommentsRepository.comments.has(id)) {
            throw new Error(`No comment with ${id} found.`);
        }
        CommentsRepository.comments.delete(id);
    }

    removeAllByThreadId(threadId: number) {
        CommentsRepository.comments.forEach((value, key) => {
            if(value.threadId === threadId)
                CommentsRepository.comments.delete(key);
        });
    }
}
