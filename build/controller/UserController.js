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
exports.UserController = void 0;
class UserController {
    constructor(userBusiness, userDTO) {
        this.userBusiness = userBusiness;
        this.userDTO = userDTO;
        this.getAllUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    q: req.query.q,
                    token: req.headers.authorization
                };
                const output = yield this.userBusiness.getAllUsers(input);
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
        this.signUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const input = this.userDTO.signUp(name, email, password);
                const output = yield this.userBusiness.signUp(input);
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
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const input = this.userDTO.login(email, password);
                const output = yield this.userBusiness.login(input);
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
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map