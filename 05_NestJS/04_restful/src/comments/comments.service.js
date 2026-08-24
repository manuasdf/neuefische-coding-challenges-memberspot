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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const comment_entity_1 = require("./entities/comment.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let CommentsService = class CommentsService {
    comments;
    constructor(comments) {
        this.comments = comments;
    }
    async findOne(id) {
        if (id === undefined)
            throw new Error("No id found");
        const comment = await this.comments.findOneBy({ id });
        if (!comment)
            throw new Error("No comment found");
        return comment;
    }
    async remove(id) {
        if (id === undefined) {
            throw new Error("No id found");
        }
        let comment = await this.comments.findOneBy({ id });
        if (!comment)
            throw new Error("No comment found");
        comment.body = "deleted";
        const updateComment = await this.comments.save(comment);
        return updateComment;
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(comment_entity_1.Comment)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], CommentsService);
