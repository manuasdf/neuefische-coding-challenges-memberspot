"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const comments_module_1 = require("./comments/comments.module");
const threads_module_1 = require("./threads/threads.module");
const comment_entity_1 = require("./comments/entities/comment.entity");
const thread_entity_1 = require("./threads/entities/thread.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            comments_module_1.CommentsModule,
            threads_module_1.ThreadsModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: "better-sqlite3",
                database: "data/chat.sqlite",
                entities: [comment_entity_1.Comment, thread_entity_1.Thread],
                synchronize: true,
                logging: false,
                enableWAL: true,
                statementCacheSize: 100,
            })
        ]
    })
], AppModule);
async function bootstrap() {
    const app = await core_1.NestFactory.create(AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector), {
        excludeExtraneousValues: true,
    }));
    await app.listen(3232);
    console.log(`Server is running on port ${await app.getUrl()}`);
}
bootstrap();
