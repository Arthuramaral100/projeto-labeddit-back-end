import { BaseDatabase } from "../../src/database/BaseDatabase"
import { UserDB, USER_ROLES } from "../../src/types"

export class UserDatabaseMock extends BaseDatabase {
    public static TABLE_USERS = "users"

    public getAllUsers = async (): Promise<UserDB[]>  => {
        return [
            {
                id: "id-mock",
                name: "Normal Mock",
                email: "normal@email.com",
                password: "hash-bananinha",
                created_at: new Date().toISOString(),
                role: USER_ROLES.NORMAL
            },
            {
                id: "id-mock",
                name: "Admin Mock",
                email: "admin@email.com",
                password: "hash-bananinha",
                created_at: new Date().toISOString(),
                role: USER_ROLES.ADMIN
            }
        ]
    }

    public async signUp(newUser:UserDB){

    }

    public insert = async (userDB: UserDB): Promise<void> => {
    }

    public getUserByEmail = async (email: string): Promise<UserDB | undefined>  => {
        switch (email) {
            case "normal@email.com":
                return {
                    id: "id-mock",
                    name: "Normal Mock",
                    email: "normal@email.com",
                    password: "hash-bananinha",
                    created_at: expect.any(String),
                    role: USER_ROLES.NORMAL
                }
            case "admin@email.com":
                return {
                    id: "id-mock",
                    name: "Admin Mock",
                    email: "admin@email.com",
                    password: "hash-bananinha",
                    created_at: expect.any(String),
                    role: USER_ROLES.ADMIN
                }
            default:
                return undefined
        }
    }

    public getUserById = async (id: string):Promise<UserDB | undefined> =>{
        switch (id) {
            case "id-mock":
                return {
                    id: "id-mock",
                    name: "Normal Mock",
                    email: "normal@email.com",
                    password: "hash-bananinha",
                    created_at: expect.any(String),
                    role: USER_ROLES.NORMAL
                }
            case "admin@email.com":
                return {
                    id: "id-mock",
                    name: "Admin Mock",
                    email: "admin@email.com",
                    password: "hash-bananinha",
                    created_at: expect.any(String),
                    role: USER_ROLES.ADMIN
                }
            default:
                return undefined
        }
    }

}