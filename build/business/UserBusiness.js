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
exports.UserBusiness = void 0;
const User_1 = require("../models/User");
const types_1 = require("../types");
const BadRequestError_1 = require("../errors/BadRequestError");
const NotFoundError_1 = require("../errors/NotFoundError");
class UserBusiness {
    constructor(userDatabase, idGenerator, tokenManager, hashManager) {
        this.userDatabase = userDatabase;
        this.idGenerator = idGenerator;
        this.tokenManager = tokenManager;
        this.hashManager = hashManager;
    }
    getAllUsers(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { q, token } = input;
            if (typeof token !== "string") {
                throw new BadRequestError_1.BadRequestError("'Token' não informado!");
            }
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError("'Token' não válido!");
            }
            if (payload.role !== types_1.USER_ROLES.ADMIN) {
                throw new BadRequestError_1.BadRequestError('Você não possui perfil para acessar este recurso!');
            }
            console.log(payload);
            const usersDB = yield this.userDatabase.getAllUsers();
            const users = usersDB.map((userDB) => {
                const user = new User_1.User(userDB.id, userDB.name, userDB.email, userDB.password, userDB.role, userDB.created_at);
                return user.toDBModel();
            });
            return users;
        });
    }
    signUp(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = input;
            const id = this.idGenerator.generate();
            const passwordHash = yield this.hashManager.hash(password);
            const created_at = (new Date()).toISOString();
            const filterUserbyEmail = yield this.userDatabase.getUserByEmail(email);
            if (filterUserbyEmail) {
                throw new BadRequestError_1.BadRequestError("'E-mail' já cadastrado em outra conta.");
            }
            if (typeof name !== "string") {
                throw new BadRequestError_1.BadRequestError("'Name' precisa ser uma string.");
            }
            if (typeof email !== "string") {
                throw new BadRequestError_1.BadRequestError("'E-mail' precisa ser uma string.");
            }
            if (typeof password !== "string") {
                throw new BadRequestError_1.BadRequestError("'Password' precisa ser uma string.");
            }
            const newUser = new User_1.User(id, name, email, passwordHash, types_1.USER_ROLES.NORMAL, created_at);
            const tokenPayload = {
                id: newUser.getId(),
                name: newUser.getName(),
                role: newUser.getRole()
            };
            const token = this.tokenManager.createToken(tokenPayload);
            const newUserDB = newUser.toDBModel();
            yield this.userDatabase.signUp(newUserDB);
            const output = {
                message: "Usuário cadastrado com sucesso",
                token,
            };
            return output;
        });
    }
    login(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = input;
            if (typeof email !== "string") {
                throw new BadRequestError_1.BadRequestError("'E-mail' precisa ser uma string.");
            }
            if (password === undefined) {
                throw new BadRequestError_1.BadRequestError("Favor, informar o 'password'");
            }
            const searchUserByLogin = yield this.userDatabase.getUserByEmail(email);
            if (!searchUserByLogin) {
                throw new NotFoundError_1.NotFoundError("'E-mail' não cadastrado!");
            }
            const passwordHash = yield this.hashManager.compare(password, searchUserByLogin.password);
            if (!passwordHash) {
                console.log("busca", searchUserByLogin.password);
                console.log("pass", password);
                console.log("Hash", passwordHash);
                throw new BadRequestError_1.BadRequestError("'e-mail' ou 'senha' inválidos");
            }
            if (searchUserByLogin) {
                const userLogin = new User_1.User(searchUserByLogin.id, searchUserByLogin.name, searchUserByLogin.email, searchUserByLogin.password, searchUserByLogin.role, searchUserByLogin.created_at);
                const tokenPayload = {
                    id: userLogin.getId(),
                    name: userLogin.getName(),
                    role: userLogin.getRole()
                };
                const token = this.tokenManager.createToken(tokenPayload);
                const output = { message: "Login realizado com sucesso", token };
                return output;
            }
            else {
                const output = { message: "Dados incorretos!", token: '' };
                return output;
            }
        });
    }
}
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map