"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const PostBusiness_1 = require("../business/PostBusiness");
const PostController_1 = require("../controller/PostController");
const PostDatabase_1 = require("../database/PostDatabase");
const UserDatabase_1 = require("../database/UserDatabase");
const PostDTO_1 = require("../dtos/PostDTO");
const IdGenerator_1 = require("../services/IdGenerator");
const TokenManager_1 = require("../services/TokenManager");
exports.postRouter = express_1.default.Router();
const postController = new PostController_1.PostController(new PostBusiness_1.PostBusiness(new PostDatabase_1.PostDatabase(), new UserDatabase_1.UserDatabase(), new IdGenerator_1.IdGenerator(), new TokenManager_1.TokenManager()), new PostDTO_1.PostDTO());
exports.postRouter.get("/", postController.getPosts);
exports.postRouter.get("/:id", postController.getPostsbyId);
exports.postRouter.post("/", postController.insertNewPost);
exports.postRouter.post("/:id", postController.insertNewComment);
exports.postRouter.put("/:id", postController.updatePost);
exports.postRouter.delete("/:id", postController.deletePost);
exports.postRouter.put("/:id/like", postController.likeDislike);
//# sourceMappingURL=postRouter.js.map