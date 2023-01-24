import { type AxiosResponse } from 'axios'
import http from '../http-common'
import type Profile from '../Models/Profile'

/**
   * recupere la liste des profiles
   * @returns Retourne une promesse de type Profile[]
   */
const getProfiles = async (): Promise<AxiosResponse<Profile[], any>> => {
  return await http.get<Profile[]>('/profiles')
}

/**
   * recupere le profile par son id
   * @param id - Id du profile
   * @returns Retourne une promesse de type Profile
   */
const getProfileById = async (id: string): Promise<AxiosResponse<Profile, any>> => {
  return await http.get<Profile>(`/profiles/${id}`)
}

/**
   * met a jour le profile
   * @param id - Id du profile
   * @param profile - Nouveau profile
   * @returns Retourne une promesse de type Profile
   */
const updateProfile = async (id: string, profile: Profile): Promise<AxiosResponse<Profile, any>> => {
  return await http.put<Profile>(`/profiles/${id}`, profile)
}

/**
   * creer un profile
   * @param profile - Nouveau profile
   * @returns Retourne une promesse de type Profile
   */
const createProfile = async (profile: Profile): Promise<AxiosResponse<Profile, any>> => {
  return await http.post<Profile>('/profiles', profile)
}

/**
   * delete un profile
   * @param id - Id du profile
   * @returns Retourne une promesse de type Profile
   */
const deleteProfile = async (id: string): Promise<AxiosResponse<Profile, any>> => {
  return await http.delete<Profile>(`/profiles/${id}`)
}

const ProfileService = {
  getProfiles,
  getProfileById,
  updateProfile,
  createProfile,
  deleteProfile
}

export default ProfileService
