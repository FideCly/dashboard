import http from "../http-common";
import {Profile} from "../Models/Profile";

  /**
   * recupere la liste des profiles
   * @returns Retourne une promesse de type Profile[]
   */
  const getProfiles = () => {
    return http.get<Profile[]>("/profiles");
  };

  /**
   * recupere le profile par son id
   * @param id - Id du profile
   * @returns Retourne une promesse de type Profile
   */
  const getProfileById = (id: string) => {
    return http.get<Profile>(`/profiles/${id}`);
  };

  /**
   * met a jour le profile
   * @param id - Id du profile
   * @param profile - Nouveau profile
   * @returns Retourne une promesse de type Profile
   */
  const updateProfile = (id: string, profile: Profile) => {
    return http.post<Profile>(`/profiles/${id}`, "PUT", { data: profile });
  };

  /**
   * creer un profile
   * @param profile - Nouveau profile
   * @returns Retourne une promesse de type Profile
   */
  const createProfile = (profile: Profile) => {
    return http.post<Profile>(`/profiles`, "POST", { data: profile });
  };

  /**
   * delete un profile
   * @param id - Id du profile
   * @returns Retourne une promesse de type Profile
   */
  const deleteProfile = (id: string) => {
    return http.delete<Profile>(`/profiles/${id}`);
  };

const ProfileService = {
  getProfiles,
  getProfileById,
  updateProfile,
  createProfile,
  deleteProfile,
};

export default ProfileService;