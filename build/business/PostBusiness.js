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
exports.PostBusiness = void 0;
const types_1 = require("../types");
const BadRequestError_1 = require("../errors/BadRequestError");
const Post_1 = require("../models/Post");
class PostBusiness {
    constructor(postDatabase, userDatabase, idGenerator, tokenManager) {
        this.postDatabase = postDatabase;
        this.userDatabase = userDatabase;
        this.idGenerator = idGenerator;
        this.tokenManager = tokenManager;
        this.getPosts = (input) => __awaiter(this, void 0, void 0, function* () {
            const { q, token } = input;
            if (typeof token !== "string") {
                throw new BadRequestError_1.BadRequestError("'Token' não informado!");
            }
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError("'Token' não válido!");
            }
            const { postsDB, creatorsDB, } = yield this.postDatabase.getPostsWithCreator();
            const posts = postsDB.map((postDB) => {
                const post = new Post_1.Post(postDB.id, postDB.content, postDB.comments, postDB.likes, postDB.dislikes, postDB.created_at, postDB.updated_at, getCreator(postDB.creator_id), postDB.comments_post);
                return post.toBusinessModel();
            });
            function getCreator(creatorId) {
                const creator = creatorsDB.find((creatorDB) => {
                    return creatorDB.id === creatorId;
                });
                return {
                    id: creator.id,
                    name: creator.name
                };
            }
            return posts;
        });
        this.getPostsById = (input) => __awaiter(this, void 0, void 0, function* () {
            const { id, token } = input;
            if (typeof token !== "string") {
                throw new BadRequestError_1.BadRequestError("'Token' não informado!");
            }
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError("'Token' não válido!");
            }
            const filterPostById = yield this.postDatabase.getPostById(id);
            if (!filterPostById) {
                throw new BadRequestError_1.BadRequestError("'Post' não localizado");
            }
            const { postsDB, creatorsDB, commentsDB } = yield this.postDatabase.getPostWithComments(id);
            const posts = postsDB.map((postDB) => {
                const post = new Post_1.Post(postDB.id, postDB.content, postDB.comments, postDB.likes, postDB.dislikes, postDB.created_at, postDB.updated_at, getCreator(postDB.creator_id), getComments(postDB.id));
                return post.toBusinessCommentsModel();
            });
            function getCreator(creatorId) {
                const creator = creatorsDB.find((creatorDB) => {
                    return creatorDB.id === creatorId;
                });
                return {
                    id: creator.id,
                    name: creator.name
                };
            }
            function getComments(postId) {
                const comments = commentsDB.filter((commentDB) => {
                    return commentDB.post_id === postId;
                });
                return comments;
            }
            return posts;
        });
        this.insertNewPost = (input) => __awaiter(this, void 0, void 0, function* () {
            const { content, token } = input;
            if (typeof token !== "string") {
                throw new BadRequestError_1.BadRequestError("'Token' não informado!");
            }
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError("'Token' não válido!");
            }
            const id = this.idGenerator.generate();
            const created_at = (new Date()).toISOString();
            const updated_at = (new Date()).toISOString();
            const comments = 0;
            const likes = 0;
            const dislikes = 0;
            const creator_id = payload.id;
            if (content !== undefined) {
                if (typeof content !== "string") {
                    throw new BadRequestError_1.BadRequestError("'content' precisa ser uma string");
                }
            }
            else {
                throw new BadRequestError_1.BadRequestError("Favor, informar o 'content'");
            }
            const newPost = new Post_1.Post(id, content, comments, likes, dislikes, created_at, updated_at, { id: creator_id,
                name: payload.name, }, { id: '',
                content: '',
                likes: 0,
                dislikes: 0,
                created_at: '',
                updated_at: '',
                post_id: '',
                creator: {
                    creator_id: '',
                    name: '',
                }
            });
            const newPostDB = newPost.toDBModel();
            yield this.postDatabase.insertNewPost(newPostDB);
            const output = {
                message: "Publicação realizada com sucesso",
                post: newPost,
            };
            return output;
        });
        this.insertNewComment = (input) => __awaiter(this, void 0, void 0, function* () {
            const { id_post, content, token } = input;
            if (typeof token !== "string") {
                throw new BadRequestError_1.BadRequestError("'Token' não informado!");
            }
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError("'Token' não válido!");
            }
            const filterPostById = yield this.postDatabase.getPostById(id_post);
            if (!filterPostById) {
                throw new BadRequestError_1.BadRequestError("'Post' não localizado");
            }
            const id = this.idGenerator.generate();
            const created_at = (new Date()).toISOString();
            const updated_at = (new Date()).toISOString();
            const comments = 0;
            const likes = 0;
            const dislikes = 0;
            const creator_id = payload.id;
            if (content !== undefined) {
                if (typeof content !== "string") {
                    throw new BadRequestError_1.BadRequestError("'content' precisa ser uma string");
                }
            }
            else {
                throw new BadRequestError_1.BadRequestError("Favor, informar o 'content'");
            }
            const newComment = new Post_1.Post(id, content, comments, likes, dislikes, created_at, updated_at, { id: creator_id,
                name: payload.name, }, { id: '',
                content: '',
                likes: 0,
                dislikes: 0,
                created_at: '',
                updated_at: '',
                post_id: filterPostById.id,
                creator: {
                    creator_id: '',
                    name: '',
                }
            });
            const postToUpdate = new Post_1.Post(filterPostById.id, filterPostById.content, filterPostById.comments + 1, filterPostById.likes, filterPostById.dislikes, filterPostById.created_at, filterPostById.updated_at, {
                id: filterPostById.creator_id,
                name: ''
            }, { id: '',
                content: '',
                likes: 0,
                dislikes: 0,
                created_at: '',
                updated_at: '',
                post_id: '',
                creator: {
                    creator_id: '',
                    name: '',
                }
            });
            const newCommentDB = newComment.toDBCommentModel();
            yield this.postDatabase.insertNewComment(newCommentDB);
            const postToUpdateDB = postToUpdate.toDBModel();
            yield this.postDatabase.updatePost(postToUpdateDB, filterPostById.id);
            const output = {
                message: "Publicação realizada com sucesso",
            };
            return output;
        });
        this.updatePost = (input) => __awaiter(this, void 0, void 0, function* () {
            const { id, content, token } = input;
            if (typeof token !== "string") {
                throw new BadRequestError_1.BadRequestError("'Token' não informado!");
            }
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError("'Token' não válido!");
            }
            const filterPostToUpdate = yield this.postDatabase.getPostById(id);
            if (!filterPostToUpdate) {
                throw new BadRequestError_1.BadRequestError("'Id' não localizada");
            }
            if (payload.role !== types_1.USER_ROLES.ADMIN) {
                if (filterPostToUpdate.creator_id !== payload.id) {
                    throw new BadRequestError_1.BadRequestError("Você não possui autorização para editar esta publicação.");
                }
            }
            if (content !== undefined) {
                if (typeof content !== "string") {
                    throw new BadRequestError_1.BadRequestError("'content' precisa ser uma string");
                }
            }
            else {
                throw new BadRequestError_1.BadRequestError("Favor, informar o 'content'");
            }
            const updateAt = (new Date()).toISOString();
            const postToUpdate = new Post_1.Post(id, content, filterPostToUpdate.comments, filterPostToUpdate.likes, filterPostToUpdate.dislikes, filterPostToUpdate.created_at, updateAt, {
                id: filterPostToUpdate.creator_id,
                name: payload.name
            }, { id: '',
                content: '',
                likes: 0,
                dislikes: 0,
                created_at: '',
                updated_at: '',
                post_id: '',
                creator: {
                    creator_id: '',
                    name: '',
                }
            });
            const postToUpdateDB = postToUpdate.toDBModel();
            yield this.postDatabase.updatePost(postToUpdateDB, id);
            const output = {
                message: "Atualização realizada com sucesso",
                post: postToUpdate,
            };
            return output;
        });
        this.deletePost = (input) => __awaiter(this, void 0, void 0, function* () {
            const { id, token } = input;
            if (typeof token !== "string") {
                throw new BadRequestError_1.BadRequestError("'Token' não informado!");
            }
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError("'Token' não válido!");
            }
            const filterPostToDelete = yield this.postDatabase.getPostById(id);
            if (!filterPostToDelete) {
                throw new BadRequestError_1.BadRequestError("Publicação não encontrada");
            }
            const filterUserDB = yield this.userDatabase.getUserById(filterPostToDelete.creator_id);
            if (filterUserDB === undefined) {
                throw new BadRequestError_1.BadRequestError("Dados de publicação 'indefinido'");
            }
            if (filterUserDB.role !== types_1.USER_ROLES.ADMIN) {
                if (filterUserDB.id !== payload.id) {
                    throw new BadRequestError_1.BadRequestError("Você não possui autorização para realizar esta operação");
                }
            }
            const filterLikeDislikeDB = yield this.postDatabase.getLikeDislikeByPostId(id);
            if (filterLikeDislikeDB === undefined) {
                return;
            }
            if (filterLikeDislikeDB.length > 0) {
                yield this.postDatabase.deleteLikeDislike(id);
            }
            const filterCommentsDB = yield this.postDatabase.getCommentsById(id);
            if (filterCommentsDB === undefined) {
                return;
            }
            if (filterCommentsDB.length > 0) {
                const filterLikeDislikeCommentDB = yield this.postDatabase.getLikeDislikeByCommentId(filterCommentsDB[0].id);
                if (filterLikeDislikeCommentDB === undefined) {
                    return;
                }
                if (filterLikeDislikeCommentDB.length > 0) {
                    yield this.postDatabase.deleteLikeDislike(filterCommentsDB[0].id);
                }
                yield this.postDatabase.deleteCommentsbyId(id);
            }
            yield this.postDatabase.deletePostbyId(id);
            const output = {
                message: "Publicação excluida com sucesso",
                post: filterPostToDelete
            };
            return output;
        });
        this.likeDislike = (input) => __awaiter(this, void 0, void 0, function* () {
            const { id, like, token } = input;
            if (typeof token !== "string") {
                throw new BadRequestError_1.BadRequestError("'Token' não informado!");
            }
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError("'Token' não válido!");
            }
            const filterPostToLike = yield this.postDatabase.getPostById(id);
            const filterCommentToLike = yield this.postDatabase.getCommentById(id);
            const filterIdLD = yield this.postDatabase.likeDislike(payload.id, id);
            if (filterIdLD) {
                throw new BadRequestError_1.BadRequestError("Você já interagiu com esta publicação");
            }
            if (!filterPostToLike && !filterCommentToLike) {
                throw new BadRequestError_1.BadRequestError("Publicação não encontrada");
            }
            if (filterPostToLike) {
                let likes = filterPostToLike.likes;
                let dislikes = filterPostToLike.dislikes;
                if (like === 0) {
                    dislikes++;
                }
                else if (like === 1) {
                    likes++;
                }
                else {
                    throw new BadRequestError_1.BadRequestError("Informe um número válido. (1) like, (0) dislike");
                }
                const postToLike = new Post_1.Post(id, filterPostToLike.content, filterPostToLike.comments, likes, dislikes, filterPostToLike.created_at, filterPostToLike.updated_at, { id: filterPostToLike.creator_id,
                    name: "" }, { id: '',
                    content: '',
                    likes: 0,
                    dislikes: 0,
                    created_at: '',
                    updated_at: '',
                    post_id: '',
                    creator: {
                        creator_id: '',
                        name: '',
                    }
                });
                const updateLikeDB = {
                    user_id: payload.id,
                    post_id: id,
                    like: 1
                };
                const postToLikeDB = postToLike.toDBModel();
                yield this.postDatabase.updatePost(postToLikeDB, id);
                yield this.postDatabase.updateLikeDislike(updateLikeDB);
                if (like === 0) {
                    const output = {
                        message: "'Dislike' realizado com sucesso!",
                    };
                    return output;
                }
                else if (like === 1) {
                    const output = {
                        message: "'Like' realizado com sucesso!",
                    };
                    return output;
                }
            }
            if (filterCommentToLike) {
                let likes = 0;
                let dislikes = 0;
                if (like === 0) {
                    dislikes = 1;
                }
                else if (like === 1) {
                    likes = 1;
                }
                else {
                    throw new BadRequestError_1.BadRequestError("Informe um número válido. (1) like, (0) dislike");
                }
                const comments = 0;
                const commentToLike = new Post_1.Post(id, filterCommentToLike.content, comments, likes, dislikes, filterCommentToLike.created_at, filterCommentToLike.updated_at, { id: filterCommentToLike.creator_id,
                    name: "" }, { id: '',
                    content: '',
                    likes: 0,
                    dislikes: 0,
                    created_at: '',
                    updated_at: '',
                    post_id: '',
                    creator: {
                        creator_id: '',
                        name: '',
                    }
                });
                const updateLikeDB = {
                    user_id: payload.id,
                    comment_id: id,
                    like: 1
                };
                const commentToLikeDB = commentToLike.toDBModel();
                yield this.postDatabase.updateComment(commentToLikeDB, id);
                yield this.postDatabase.updateLikeDislikeComment(updateLikeDB);
                if (like === 0) {
                    const output = {
                        message: "'Dislike' realizado com sucesso!",
                    };
                    return output;
                }
                else if (like === 1) {
                    const output = {
                        message: "'Like' realizado com sucesso!",
                    };
                    return output;
                }
            }
        });
    }
}
exports.PostBusiness = PostBusiness;
//# sourceMappingURL=PostBusiness.js.map