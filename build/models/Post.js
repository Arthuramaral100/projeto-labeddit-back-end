"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
class Post {
    constructor(id, content, comments, likes, dislikes, created_at, updated_at, creator, comments_post) {
        this.id = id;
        this.content = content;
        this.comments = comments;
        this.likes = likes;
        this.dislikes = dislikes;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.creator = creator;
        this.comments_post = comments_post;
    }
    toDBModel() {
        return {
            id: this.id,
            creator_id: this.creator.id,
            comments: this.comments,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
    toDBCommentModel() {
        return {
            id: this.id,
            creator_id: this.creator.id,
            post_id: this.comments_post.post_id,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
    toDBLikeDislikeModel() {
        return {
            post_id: this.id,
            user_id: this.creator.id,
            like: this.likes,
        };
    }
    toBusinessModel() {
        return {
            id: this.id,
            content: this.content,
            comments: this.comments,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.created_at,
            updated_at: this.updated_at,
            creator: this.creator,
        };
    }
    toBusinessCommentsModel() {
        return {
            id: this.id,
            content: this.content,
            comments: this.comments,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.created_at,
            updated_at: this.updated_at,
            creator: this.creator,
            comments_post: this.comments_post
        };
    }
    getId() {
        return this.id;
    }
    setId(value) {
        this.id = value;
    }
    getContent() {
        return this.content;
    }
    setContent(value) {
        this.content = value;
    }
    getComments() {
        return this.comments;
    }
    setComments(value) {
        this.comments = value;
    }
    getLikes() {
        return this.likes;
    }
    setLikes(value) {
        this.likes = value;
    }
    getDislikes() {
        return this.dislikes;
    }
    setDislikes(value) {
        this.dislikes = value;
    }
    getCreatedAt() {
        return this.created_at;
    }
    setCreatedAt(value) {
        this.created_at = value;
    }
    getUpdatedAt() {
        return this.updated_at;
    }
    setUpdatedAt(value) {
        this.updated_at = value;
    }
    getCreator() {
        return this.creator;
    }
    setCreator(value) {
        this.creator = value;
    }
}
exports.Post = Post;
//# sourceMappingURL=Post.js.map