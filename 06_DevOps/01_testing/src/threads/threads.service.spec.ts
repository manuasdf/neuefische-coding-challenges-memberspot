import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { describe, beforeEach, it, expect, vi } from "vitest";
import { ThreadsService } from "./threads.service";
import { Thread } from "./entities/thread.entity";
import { Comment } from "../comments/entities/comment.entity";
import { NotFoundException } from "@nestjs/common";
import { CreateThreadDto } from "./dto/create-thread.dto";
import { CreateCommentDto } from "../comments/dto/create-comment.dto";

// Implement at least the following test cases (you are, of course, free to write as many tests as you like):

// [x] Test that calling findAll returns an array of threads provided by your mock repository.
// [x] Test that calling findOne with a valid ID returns the correct thread object.
// [x] Test that calling findOne with an ID that does not exist throws a NotFoundException.
// [x] Test that calling create successfully passes the DTO to the repository’s save method and returns the new thread.
// [x] Test that calling remove triggers the repository’s delete method with the correct ID.
// [x] Test that creating a Comment correctly associates it with a Thread ID before saving it to the repository.


const mockThreadRepository = {
  findAndCount: vi.fn(),
  findOne: vi.fn(),
  findOneBy: vi.fn(),
  find: vi.fn(),
  create: vi.fn(),
  save: vi.fn(),
  remove: vi.fn(),
  addComment: vi.fn()
};

const mockCommentRepository = {
  save: vi.fn()
}

const mockThreads = [
      { id: "1", title: "Thread 1", body: "Body 1", author: "Author 1", createdAt: new Date(), comments: [] },
      { id: "2", title: "Thread 2", body: "Body 2", author: "Author 2", createdAt: new Date(), comments: [] },
    ];

describe("ThreadsService", () => {
  let service: ThreadsService;
  
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ThreadsService,
        {
          provide: getRepositoryToken(Thread),
          useValue: mockThreadRepository,
        },
        {
          provide: getRepositoryToken(Comment),
          useValue: mockCommentRepository,
        }
      ]
    }).compile();

    service = moduleRef.get<ThreadsService>(ThreadsService);
  });

  it("returns an array of threads", async () => {
    mockThreadRepository.findAndCount.mockResolvedValue([mockThreads, 2]);
    const response = await service.findAll({ page: 1, limit: 10 });
    expect(mockThreadRepository.findAndCount).toHaveBeenCalled();
    expect(response).toEqual({ 
      data: mockThreads, 
      meta: {
        page: 1,
        limit: 10,
        total: 2,
        totalPages: 1
      }
    });
  });

  it("finds thread with a valid ID", async () => {
    mockThreadRepository.find.mockResolvedValue(mockThreads[0]);
    const result = await service.findOne("1");

    expect(mockThreadRepository.find).toHaveBeenCalled();
    expect(result).toEqual(mockThreads[0]);
  })

  it("throws exception with an invalid ID", async () => {
    mockThreadRepository.find.mockResolvedValue(undefined);

    expect(service.findOne("999")).rejects.toThrow(NotFoundException);
    expect(mockThreadRepository.find).toHaveBeenCalled();
  })

  it("creates new thread from DTO", async () => {
    const newThread = {
      id: "1", title: "Thread 1", body: "Body 1", author: "Author 1", createdAt: new Date(), comments: []
    } as CreateThreadDto;
    mockThreadRepository.save.mockResolvedValue(newThread);
    const result = await service.create(newThread)

    expect(mockThreadRepository.save).toHaveBeenCalled();
    expect(result).toEqual(newThread);
  })

  it("removes a thread by id", async () => {
    mockThreadRepository.findOneBy.mockResolvedValue(mockThreads)
    mockThreadRepository.remove.mockResolvedValue(undefined);
    await service.remove("2");

    expect(mockThreadRepository.findOneBy).toHaveBeenCalledWith({ id: "2" });
    expect(mockThreadRepository.remove).toHaveBeenCalled();
  })

  it("creates a comment corresponding to a thread", async () => {
    const comment = {
      id: "1", title: "Title 1", body: "Body 1"
    } as unknown as CreateCommentDto;
    const thread = mockThreads[0];
    const newComment = Object.assign({}, comment, { thread: thread });
    console.log(newComment);

    mockThreadRepository.findOneBy.mockResolvedValue(thread);
    mockCommentRepository.save.mockResolvedValue(newComment);

    const response = await service.addComment("1", comment);

    expect(response).toEqual(newComment);

    expect(mockThreadRepository.findOneBy).toHaveBeenCalledWith({ id: "1" });
    expect(mockCommentRepository.save).toHaveBeenCalledWith(newComment);
  })
});