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
exports.ThreadsService = void 0;
const common_1 = require("@nestjs/common");
const thread_entity_1 = require("./entities/thread.entity");
const comment_entity_1 = require("../comments/entities/comment.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ThreadsService = class ThreadsService {
    threads;
    comments;
    constructor(threads, comments) {
        this.threads = threads;
        this.comments = comments;
    }
    async create(newThread) {
        if (!newThread || !newThread.title)
            throw new common_1.BadRequestException("No title in thread found");
        if (!newThread || !newThread.body)
            throw new common_1.BadRequestException("No body in thread found");
        const thread = this.threads.save(newThread);
        return thread;
    }
    async update(id, updateThread) {
        if (!updateThread || !updateThread.title)
            throw new common_1.NotFoundException("No title found");
        if (!updateThread || !updateThread.body)
            throw new common_1.NotFoundException("No body found");
        const threadUpdated = new thread_entity_1.Thread();
        Object.assign(threadUpdated, updateThread, { id });
        const thread = await this.threads.save(threadUpdated);
        return thread;
    }
    async findAll(paginationQuery) {
        const { page, limit } = paginationQuery;
        const [data, total] = await this.threads.findAndCount({
            skip: (page - 1) * limit,
            take: limit
        });
        if (!data)
            throw new common_1.NotFoundException("Thread not found");
        return {
            data,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        };
    }
    async findOne(id) {
        if (id === undefined)
            throw new common_1.BadRequestException("Id not found");
        const thread = await this.threads.find({
            where: { id },
            relations: {
                comments: true,
            }
        });
        if (!thread)
            throw new common_1.NotFoundException("Thread not found");
        return thread;
    }
    async addComment(id, newComment) {
        if (id === undefined)
            throw new common_1.BadRequestException("No id found");
        const thread = await this.threads.findOneBy({ id });
        if (!thread)
            throw new common_1.NotFoundException("Thread not found");
        const newElement = new comment_entity_1.Comment();
        Object.assign(newElement, newComment, { thread });
        const comment = this.comments.save(newElement);
        return comment;
    }
    async remove(id) {
        if (id === undefined)
            throw new common_1.BadRequestException("No id found");
        const thread = await this.threads.findOneBy({ id });
        if (!thread)
            throw new common_1.NotFoundException("Thread not found");
        this.threads.remove(thread);
    }
};
exports.ThreadsService = ThreadsService;
exports.ThreadsService = ThreadsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(thread_entity_1.Thread)),
    __param(1, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ThreadsService);
