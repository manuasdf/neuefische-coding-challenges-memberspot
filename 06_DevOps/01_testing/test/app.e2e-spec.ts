import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
const request = require("supertest");
import { describe, beforeAll, afterAll, it, expect } from "vitest";
import { AppModule } from "../src/app.module";
import { JwtAuthGuard } from "../src/auth/jwt-auth.guard";

describe("App (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // This pulls in the entire application tree
    }).overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = module.createNestApplication();

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );

    it("returns a 404 status for an unknown user ID", () => {
      return request(app.getHttpServer()).get("/jewlery/99999").expect(404);
    });

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });
});