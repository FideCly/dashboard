import { type AxiosResponse } from 'axios'
import http from '../http-common'
import type User from '../Models/User'

/**
   * Récupère la liste des utilisateurs
   * @returns Retourne une promesse de type User[]
   */
const getUsers = async (): Promise<AxiosResponse<User[], any>> => {
  return await http.get<User[]>('/users')
}

/**
   * Récupère l'utilisateur par son id
   * @param id - Id de l'utilisateur
   * @returns Retourne une promesse de type User
   */
const getUserById = async (id: string): Promise<AxiosResponse<User, any>> => {
  return await http.get<User>(`/users/${id}`)
}

/**
   * Met à jour l'utilisateur
   * @param id - Id de l'utilisateur
   * @param user - Nouvel utilisateur
   * @returns Retourne une promesse de type User
   */
const updateUser = async (id: string, user: User): Promise<AxiosResponse<User, any>> => {
  return await http.post<User>(`/users/${id}`, user)
}

/**
   * Crée un utilisateur
   * @param user - Nouvel utilisateur
   * @returns Retourne une promesse de type User
   */
const createUser = async (user: User): Promise<AxiosResponse<User, any>> => {
  return await http.post<User>('/users', user)
}

/**
   * Supprime un utilisateur
   * @param id - Id de l'utilisateur
   * @returns Retourne une promesse de type User
   */
const deleteUser = async (id: string): Promise<AxiosResponse<User, any>> => {
  return await http.delete<User>(`/users/${id}`)
}
const UserService = {
  getUsers,
  getUserById,
  updateUser,
  createUser,
  deleteUser
}

export default UserService
