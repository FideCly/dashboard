import { type AxiosResponse } from 'axios'
import {httpCommon} from '../http-common'
import {IUserUpdatePayload,IUser} from '../Models/User'
/**
 * Récupère la liste des utilisateurs
 * @returns Retourne une promesse de type Users[]
 * @see Users
 * @see src/Types/Users.ts
 * @see src/Api/Models/Users.ts
 */
const getUsers = async (): Promise<AxiosResponse<IUser[], any>> => {
    return await httpCommon.get<IUser[]>('/user')
    }

/**
 * Récupère l'utilisateur par son id
 * @param id - Id de l'utilisateur
 * @returns Retourne une promesse de type Users
 * @see Users
 * @see src/Types/Users.ts
 */
const getUserById = async (id: string): Promise<AxiosResponse<IUser, any>> => {
    return await httpCommon.get<IUser>(`/user/${id}`)
    }

/**
 * Met à jour l'utilisateur
 * @param id - Id de l'utilisateur
 * @param user - Nouvel utilisateur
 * @returns Retourne une promesse de type Users
 * @see Users
 */
const updateUser = async (id: string, user: IUserUpdatePayload): Promise<AxiosResponse<IUserUpdatePayload, any>> => {
    return await httpCommon.put<IUserUpdatePayload>(`/user/${id}`, user)
    }

/**
 * delete user
 * @param id - Id of the user
 * @returns Retourne une promesse de type Users
 * @see Users
 */
const deleteUser = async (id: string): Promise<AxiosResponse<IUser, any>> => {
    return await httpCommon.delete<IUser>(`/user/${id}`)
    }

const UserService = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}

export default UserService
