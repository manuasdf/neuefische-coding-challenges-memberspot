"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadsController = void 0;
const common_1 = require("@nestjs/common");
const threads_service_1 = require("./threads.service");
const create_thread_dto_1 = require("./dto/create-thread.dto");
const create_comment_dto_1 = require("../comments/dto/create-comment.dto");
const update_thread_dto_1 = require("./dto/update-thread.dto");
const class_transformer_1 = require("class-transformer");
const thread_response_dto_1 = require("./dto/thread-response.dto");
const pagination_query_dto_1 = require("./dto/pagination-query.dto");
let ThreadsController = class ThreadsController {
    threadsService;
    constructor(threadsService) {
        this.threadsService = threadsService;
    }
    //  	Create a thread with title and body
    create(createThread) {
        const threads = this.threadsService.create(createThread);
        if (!threads)
            throw new common_1.NotFoundException("Thread not created");
        return (0, class_transformer_1.plainToInstance)(thread_response_dto_1.ThreadResponseDto, threads, {
            excludeExtraneousValues: true,
        });
    }
    //  	List all threads
    async findAll(paginationQuery) {
        const { data, meta } = await this.threadsService.findAll(paginationQuery);
        return {
            data: (0, class_transformer_1.plainToInstance)(thread_response_dto_1.ThreadResponseDto, data, {
                excludeExtraneousValues: true,
            }),
            meta
        };
    }
    //    Get one thread including its comments
    async findOne(id) {
        const threads = await this.threadsService.findOne(id);
        if (!threads)
            throw new common_1.NotFoundException("Thread not found");
        return (0, class_transformer_1.plainToInstance)(thread_response_dto_1.ThreadResponseDto, threads, {
            excludeExtraneousValues: true,
        });
    }
    async update(id, updateThread) {
        const threads = await this.threadsService.update(id, updateThread);
        if (!threads)
            throw new common_1.NotFoundException("Thread not updated");
        return (0, class_transformer_1.plainToInstance)(thread_response_dto_1.ThreadResponseDto, threads, {
            excludeExtraneousValues: true,
        });
    }
    //  	Add a comment to a thread
    async addComment(id, newComment) {
        const threads = await this.threadsService.addComment(id, newComment);
        if (!threads)
            throw new common_1.NotFoundException("Thread not found");
        return (0, class_transformer_1.plainToInstance)(thread_response_dto_1.ThreadResponseDto, threads, {
            excludeExtraneousValues: true,
        });
    }
    // //    Deletes the thread and all of its comments (comments are actually deleted)
    async remove(id) {
        return await this.threadsService.remove(id);
    }
};
exports.ThreadsController = ThreadsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_thread_dto_1.CreateThreadDto]),
    __metadata("design:returntype", void 0)
], ThreadsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_thread_dto_1.UpdateThreadDto]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(":id/comments"),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "addComment", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "remove", null);
exports.ThreadsController = ThreadsController = __decorate([
    (0, common_1.Controller)('threads'),
    __metadata("design:paramtypes", [threads_service_1.ThreadsService])
], ThreadsController);
