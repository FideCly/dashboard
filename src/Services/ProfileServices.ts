import { callAPI } from "../Modules/api";
import Profile from "../Types";

export const ProfileService = {
  /**
   * recupere la liste des profiles
   * @returns Retourne une promesse de type Profile[]
   */
  getProfiles() {
    return callAPI<Profile[]>("/profiles", "GET");
  },

  /**
   * recupere le profile par son id
   * @param id - Id du profile
   * @returns Retourne une promesse de type Profile
   */
  getProfileById(id: string) {
    return callAPI<Profile>(`/profiles/${id}`, "GET");
  },

  /**
   * met a jour le profile
   * @param id - Id du profile
   * @param profile - Nouveau profile
   * @returns Retourne une promesse de type Profile
   */
  updateProfile(id: string, profile: Profile) {
    return callAPI<Profile>(`/profiles/${id}`, "PUT", { data: profile });
  },

  /**
   * creer un profile
   * @param profile - Nouveau profile
   * @returns Retourne une promesse de type Profile
   */
  createProfile(profile: Profile) {
    return callAPI<Profile>(`/profiles`, "POST", { data: profile });
  },

  /**
   * delete un profile
   * @param id - Id du profile
   * @returns Retourne une promesse de type Profile
   */
  deleteProfile(id: string) {
    return callAPI<Profile>(`/profiles/${id}`, "DELETE");
  },
};
