import { type AxiosResponse } from 'axios'
import http from '../http-common'
import {IUser, IUserAuthPayload, jwttoken } from '../Models/User'


/**
 * login - Login user with username and password
  * @param user - user of type IUserLoginPayload
 * @returns Retourne a jwt token
 */
const login = async (user: IUserAuthPayload): Promise<AxiosResponse<jwttoken, any>> => {
  return await http.post<jwttoken>('/auth/login', user)
}

/**
 * signup - Signup user with username, email and password
  * @param user - user of type IuserCreatePayload
 * @returns Retourne a jwt token
 */
const signup = async (user: IUserAuthPayload): Promise<AxiosResponse<IUser, any>> => {
  return await http.post<IUser>('/auth/signup', user)
}


const AuthServices = {
  login,
  signup
}

export default AuthServices
