import { callAPI } from "../Modules/api";
import User from "../Types";

export const UserService = {
  /**
   * Récupère la liste des utilisateurs
   * @returns Retourne une promesse de type User[]
   */
  getUsers() {
    return callAPI<User[]>("/users", "GET");
  },

  /**
   * Récupère l'utilisateur par son id
   * @param id - Id de l'utilisateur
   * @returns Retourne une promesse de type User
   */
  getUserById(id: string) {
    return callAPI<User>(`/users/${id}`, "GET");
  },

  /**
   * Met à jour l'utilisateur
   * @param id - Id de l'utilisateur
   * @param user - Nouvel utilisateur
   * @returns Retourne une promesse de type User
   */
  updateUser(id: string, user: User) {
    return callAPI<User>(`/users/${id}`, "PUT", { data: user });
  },

  /**
   * Crée un utilisateur
   * @param user - Nouvel utilisateur
   * @returns Retourne une promesse de type User
   */
  createUser(user: User) {
    return callAPI<User>(`/users`, "POST", { data: user });
  },

  /**
   * Supprime un utilisateur
   * @param id - Id de l'utilisateur
   * @returns Retourne une promesse de type User
   */
  deleteUser(id: string) {
    return callAPI<User>(`/users/${id}`, "DELETE");
  },
};
