"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDTO = void 0;
class PostDTO {
    constructor() {
        this.getAllPostsInput = (q, token) => {
            const result = {
                q,
                token,
            };
            return result;
        };
        this.getPostInput = (id, token) => {
            const result = {
                id,
                token
            };
            return result;
        };
        this.insertInputPost = (content, token) => {
            const result = {
                content,
                token,
            };
            return result;
        };
        this.InsertInputComment = (id_post, content, token) => {
            const result = {
                id_post,
                content,
                token,
            };
            return result;
        };
        this.deleteInputPost = (id, token) => {
            const result = {
                id,
                token,
            };
            return result;
        };
        this.updateInputPost = (id, content, token) => {
            const result = {
                id,
                content,
                token,
            };
            return result;
        };
        this.likeDislike = (id, like, token) => {
            const result = {
                id,
                like,
                token,
            };
            return result;
        };
    }
}
exports.PostDTO = PostDTO;
//# sourceMappingURL=PostDTO.js.map