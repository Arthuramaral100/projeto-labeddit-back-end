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
exports.PostController = void 0;
class PostController {
    constructor(postBusiness, postDTO) {
        this.postBusiness = postBusiness;
        this.postDTO = postDTO;
        this.getPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    q: req.query.q,
                    token: req.headers.authorization
                };
                const output = yield this.postBusiness.getPosts(input);
                res.status(201).send(output);
            }
            catch (error) {
                console.log(error);
                if (req.statusCode === 200) {
                    res.status(500);
                }
                if (error instanceof Error) {
                    res.send(error.message);
                }
                else {
                    res.send("Erro inesperado");
                }
            }
        });
        this.getPostsbyId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    id: req.params.id,
                    token: req.headers.authorization
                };
                const output = yield this.postBusiness.getPostsById(input);
                res.status(201).send(output);
            }
            catch (error) {
                console.log(error);
                if (req.statusCode === 200) {
                    res.status(500);
                }
                if (error instanceof Error) {
                    res.send(error.message);
                }
                else {
                    res.send("Erro inesperado");
                }
            }
        });
        this.insertNewPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const content = req.body.content;
                const token = req.headers.authorization;
                const input = this.postDTO.insertInputPost(content, token);
                const output = yield this.postBusiness.insertNewPost(input);
                res.status(200).send(output);
            }
            catch (error) {
                console.log(error);
                if (req.statusCode === 200) {
                    res.status(500);
                }
                if (error instanceof Error) {
                    res.send(error.message);
                }
                else {
                    res.send("Erro inesperado");
                }
            }
        });
        this.insertNewComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const content = req.body.content;
                const token = req.headers.authorization;
                const input = this.postDTO.InsertInputComment(id, content, token);
                const output = yield this.postBusiness.insertNewComment(input);
                res.status(200).send(output);
            }
            catch (error) {
                console.log(error);
                if (req.statusCode === 200) {
                    res.status(500);
                }
                if (error instanceof Error) {
                    res.send(error.message);
                }
                else {
                    res.send("Erro inesperado");
                }
            }
        });
        this.updatePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const content = req.body.content;
                const token = req.headers.authorization;
                const input = yield this.postDTO.updateInputPost(id, content, token);
                const output = yield this.postBusiness.updatePost(input);
                res.status(201).send(output);
            }
            catch (error) {
                console.log(error);
                if (req.statusCode === 200) {
                    res.status(500);
                }
                if (error instanceof Error) {
                    res.send(error.message);
                }
                else {
                    res.send("Erro inesperado");
                }
            }
        });
        this.deletePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const token = req.headers.authorization;
                const input = yield this.postDTO.deleteInputPost(id, token);
                const output = yield this.postBusiness.deletePost(input);
                res.status(201).send(output);
            }
            catch (error) {
                console.log(error);
                if (req.statusCode === 200) {
                    res.status(500);
                }
                if (error instanceof Error) {
                    res.send(error.message);
                }
                else {
                    res.send("Erro inesperado");
                }
            }
        });
        this.likeDislike = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    id: req.params.id,
                    like: req.body.like,
                    token: req.headers.authorization,
                };
                const output = yield this.postBusiness.likeDislike(input);
                res.status(201).send(output);
            }
            catch (error) {
                console.log(error);
                if (req.statusCode === 200) {
                    res.status(500);
                }
                if (error instanceof Error) {
                    res.send(error.message);
                }
                else {
                    res.send("Erro inesperado");
                }
            }
        });
    }
}
exports.PostController = PostController;
//# sourceMappingURL=PostController.js.map