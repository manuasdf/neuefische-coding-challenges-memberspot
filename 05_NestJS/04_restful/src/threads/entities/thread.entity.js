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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thread = void 0;
const typeorm_1 = require("typeorm");
const comment_entity_1 = require("../../comments/entities/comment.entity");
let Thread = class Thread {
    id;
    title;
    author;
    body;
    createdAt;
    comments;
};
exports.Thread = Thread;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Thread.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "Empty title" }),
    __metadata("design:type", String)
], Thread.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "Author placeholder" }),
    __metadata("design:type", String)
], Thread.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "Empty body text" }),
    __metadata("design:type", String)
], Thread.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Thread.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.thread),
    __metadata("design:type", Array)
], Thread.prototype, "comments", void 0);
exports.Thread = Thread = __decorate([
    (0, typeorm_1.Entity)("threads")
], Thread);
