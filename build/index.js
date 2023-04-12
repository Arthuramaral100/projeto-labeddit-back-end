"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const postRouter_1 = require("./router/postRouter");
const userRouter_1 = require("./router/userRouter");
dotenv_1.default.config();
const app = (0, express_1.default)();
const local = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(local, () => {
    console.log(`Servidor iniciado na porta ${local}`);
});
app.use("/posts", postRouter_1.postRouter);
app.use("/users", userRouter_1.userRouter);
//# sourceMappingURL=index.js.map