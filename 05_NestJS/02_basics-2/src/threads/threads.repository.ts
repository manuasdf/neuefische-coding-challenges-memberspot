import { Injectable } from '@nestjs/common';
import { Thread } from './entities/thread.entity';

@Injectable()
export class ThreadsRepository {
    private static threads: Map<number, Thread> = new Map<number, Thread>();
    private static currentId: number = 0;

    create(newThread: Thread) {
        let thread = newThread;
        thread.createdAt = new Date();
        ThreadsRepository.threads.set(ThreadsRepository.currentId, thread);
        ThreadsRepository.currentId++;
    }

    findAll(): Thread[] {
        const allThreads: Thread[] = [];
        ThreadsRepository.threads.forEach((value, key) => {
            allThreads.push({...value, id: key});
        });
        return allThreads;
    }

    findOne(id: number): Thread | undefined {
        return ThreadsRepository.threads.get(id);
    }

    update(id: number, updateThread: Thread) {
        if (!ThreadsRepository.threads.has(id)) {
            throw new Error(`No thread with ${id} found.`);
        }
        ThreadsRepository.threads.set(id, updateThread);
    }

    remove(id: number) {
        if (!ThreadsRepository.threads.has(id)) {
            throw new Error(`No thread with ${id} found.`);
        }
        ThreadsRepository.threads.delete(id);
    }
}
