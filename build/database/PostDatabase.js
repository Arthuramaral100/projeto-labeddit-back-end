"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const UserDatabase_1 = require("./UserDatabase");
class PostDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.getAllPosts = () => __awaiter(this, void 0, void 0, function* () {
            const postDB = yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.POSTS_TABLE)
                .select();
            return postDB;
        });
        this.getPostsWithCreator = () => __awaiter(this, void 0, void 0, function* () {
            const postsDB = yield this.getAllPosts();
            const creatorsDB = yield BaseDatabase_1.BaseDatabase
                .connection(UserDatabase_1.UserDatabase.TABLE_USERS)
                .select();
            return {
                postsDB,
                creatorsDB,
            };
        });
        this.getPostWithComments = (id) => __awaiter(this, void 0, void 0, function* () {
            const postsDB = yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.POSTS_TABLE)
                .select().where({ id: id });
            const creatorsDB = yield BaseDatabase_1.BaseDatabase
                .connection(UserDatabase_1.UserDatabase.TABLE_USERS)
                .select();
            const commentsDB = yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.COMMENTS_TABLE)
                .select("comments_posts.*", "users.name")
                .leftJoin(PostDatabase.USERS_TABLE, "users.id", "=", "comments_posts.creator_id");
            return {
                postsDB,
                creatorsDB,
                commentsDB,
            };
        });
        this.getPostById = (id) => __awaiter(this, void 0, void 0, function* () {
            const [postDB] = yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.POSTS_TABLE)
                .select().where({ id: id });
            return postDB;
        });
        this.getCommentById = (id) => __awaiter(this, void 0, void 0, function* () {
            const [commentDB] = yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.COMMENTS_TABLE)
                .select().where({ id: id });
            return commentDB;
        });
        this.getCommentsById = (id) => __awaiter(this, void 0, void 0, function* () {
            const commentDB = yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.COMMENTS_TABLE)
                .select().where({ post_id: id });
            return commentDB;
        });
        this.getLikeDislikeByPostId = (id) => __awaiter(this, void 0, void 0, function* () {
            const likeDislikeDB = yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.LIKEDISLIKE_TABLE)
                .select().where({ post_id: id });
            return likeDislikeDB;
        });
        this.getLikeDislikeByCommentId = (id) => __awaiter(this, void 0, void 0, function* () {
            const likeDislikeDB = yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.LIKEDISLIKECOMMENT_TABLE)
                .select().where({ comment_id: id });
            return likeDislikeDB;
        });
        this.insertNewPost = (newPostDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(PostDatabase.POSTS_TABLE)
                .insert(newPostDB);
        });
        this.insertNewComment = (newPostDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(PostDatabase.COMMENTS_TABLE)
                .insert(newPostDB);
        });
        this.updatePost = (updatePost, id) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.POSTS_TABLE)
                .update(updatePost)
                .where({ id: id });
        });
        this.updateComment = (updatePost, id) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.COMMENTS_TABLE)
                .update(updatePost)
                .where({ id: id });
        });
        this.deletePostbyId = (id) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.POSTS_TABLE)
                .del()
                .where({ id: id });
        });
        this.deleteCommentsbyId = (id) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.COMMENTS_TABLE)
                .del()
                .where({ post_id: id });
        });
        this.deleteLikeDislike = (id) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.LIKEDISLIKE_TABLE)
                .del()
                .where({ post_id: id });
        });
        this.deleteLikeDislikeComments = (id) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.LIKEDISLIKE_TABLE)
                .del()
                .where({ comment_id: id });
        });
        this.likeDislike = (user_id, post_id) => __awaiter(this, void 0, void 0, function* () {
            const [likeDislikeDB] = yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.LIKEDISLIKE_TABLE)
                .select().where({ user_id: user_id, post_id: post_id });
            return likeDislikeDB;
        });
        this.updateLikeDislike = (updateLD) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.LIKEDISLIKE_TABLE)
                .insert(updateLD);
        });
        this.updateLikeDislikeComment = (updateLD) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.LIKEDISLIKECOMMENT_TABLE)
                .insert(updateLD);
        });
    }
}
exports.PostDatabase = PostDatabase;
PostDatabase.POSTS_TABLE = "posts";
PostDatabase.COMMENTS_TABLE = "comments_posts";
PostDatabase.LIKEDISLIKE_TABLE = "likes_dislikes";
PostDatabase.LIKEDISLIKECOMMENT_TABLE = "likes_dislikes_comments";
PostDatabase.USERS_TABLE = "users";
//# sourceMappingURL=PostDatabase.js.map