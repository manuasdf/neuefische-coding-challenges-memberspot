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
exports.CommentsController = void 0;
const common_1 = require("@nestjs/common");
const comments_service_1 = require("./comments.service");
const comment_response_dto_1 = require("./dto/comment-response.dto");
const class_transformer_1 = require("class-transformer");
let CommentsController = class CommentsController {
    commentsService;
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    // Get one comment
    findOne(id) {
        const comment = this.commentsService.findOne(id);
        if (!comment)
            throw new common_1.NotFoundException("Comment not found");
        return (0, class_transformer_1.plainToInstance)(comment_response_dto_1.CommentResponseDto, comment, {
            excludeExtraneousValues: true,
        });
    }
    // // Special: Does not delete the comment, but sets its body to “deleted”
    async remove(id) {
        const comment = await this.commentsService.remove(id);
        if (!comment)
            throw new common_1.NotFoundException("Comment not found");
        return (0, class_transformer_1.plainToInstance)(comment_response_dto_1.CommentResponseDto, comment, {
            excludeExtraneousValues: true,
        });
    }
};
exports.CommentsController = CommentsController;
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "remove", null);
exports.CommentsController = CommentsController = __decorate([
    (0, common_1.Controller)('comments'),
    __metadata("design:paramtypes", [comments_service_1.CommentsService])
], CommentsController);
