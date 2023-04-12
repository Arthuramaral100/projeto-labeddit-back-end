"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDTO = void 0;
class UserDTO {
    constructor() {
        this.getAllUsersInput = (q, token) => {
            const result = {
                q,
                token,
            };
            return result;
        };
        this.signUp = (name, email, password) => {
            const result = {
                name,
                email,
                password,
            };
            return result;
        };
        this.login = (email, password) => {
            const result = {
                email,
                password
            };
            return result;
        };
    }
}
exports.UserDTO = UserDTO;
//# sourceMappingURL=UserDTO.js.map