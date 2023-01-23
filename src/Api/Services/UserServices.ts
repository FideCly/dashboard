import http from "../http-common";
import User from "../Models/User";


  /**
   * Récupère la liste des utilisateurs
   * @returns Retourne une promesse de type User[]
   */
  const getUsers = () => {
    return http.get<User[]>("/users");
};

  /**
   * Récupère l'utilisateur par son id
   * @param id - Id de l'utilisateur
   * @returns Retourne une promesse de type User
   */
  const getUserById = (id: string) => {
    return http.get<User>(`/users/${id}`);
};

  /**
   * Met à jour l'utilisateur
   * @param id - Id de l'utilisateur
   * @param user - Nouvel utilisateur
   * @returns Retourne une promesse de type User
   */
  const updateUser = (id: string, user: User) => {
    return http.post<User>(`/users/${id}`, user);
};

  /**
   * Crée un utilisateur
   * @param user - Nouvel utilisateur
   * @returns Retourne une promesse de type User
   */
  const createUser = (user: User) => {
    return http.post<User>(`/users`, user);
};

  /**
   * Supprime un utilisateur
   * @param id - Id de l'utilisateur
   * @returns Retourne une promesse de type User
   */
  const deleteUser = (id: string) => {
    return http.delete<User>(`/users/${id}`);
};
const UserService = {
  getUsers,
  getUserById,
  updateUser,
  createUser,
  deleteUser,
};

export default UserService;
