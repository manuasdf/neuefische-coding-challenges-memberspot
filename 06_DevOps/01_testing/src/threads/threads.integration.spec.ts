import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
const request = require("supertest");
import { describe, beforeAll, afterAll, it, vi } from "vitest";
import { ThreadsController } from "./threads.controller";
import { ThreadsService } from "./threads.service";
import { Thread } from "./entities/thread.entity";
import { Comment } from "../comments/entities/comment.entity";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

const mockedComment = {
      id: "123e4567-e89b-12d3-a456-426614174003", title: "Title 1", body: "Body 1"
    }

const mockCommentRepository = {
  find: vi.fn().mockResolvedValue(mockedComment),
};

const mockedThreads = [
      { id: "123e4567-e89b-12d3-a456-426614174001", body: "Body 1", author: "Author 1" },
      { id: "123e4567-e89b-12d3-a456-426614174002", body: "Body 2", author: "Author 2" },
    ];

const mockThreadRepository = {
  findAndCount: vi.fn().mockResolvedValue([mockedThreads, 2]),
  find: vi.fn().mockResolvedValue(mockedThreads[0])
};

describe("ThreadsController (integration)", () => {
  let app: INestApplication;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThreadsController],
      providers: [
        ThreadsService,
        {
          provide: getRepositoryToken(Thread),
          useValue: mockThreadRepository,
        },
         {
          provide: getRepositoryToken(Comment),
          useValue: mockCommentRepository,
        },
      ],
    }).overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it("GET /threads/:id retrieves a thread by given id", async () => {
    return request(app.getHttpServer())
      .get("/threads/123e4567-e89b-12d3-a456-426614174001")
      .expect(200)
      .expect({ id: "123e4567-e89b-12d3-a456-426614174001", body: "Body 1", author: "Author 1" });
  });

  it("GET /threads retrieves all threads", async () => {
    return request(app.getHttpServer())
      .get("/threads?page=1&limit=10")
      .expect(200)
      .expect({
        data: mockedThreads,
        meta: {
            page: 1,
            limit: 10,
            total: 2,
            totalPages: 1
        }
      });
  });

  afterAll(async () => {
    await app.close();
  });
});