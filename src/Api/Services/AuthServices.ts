import { type AxiosResponse } from 'axios'
import {authhttp} from '../http-common'
import {IAuthPayload, IUser, IUserAuthPayload, jwttoken } from '../Models/User'


/**
 * login - Login user with username and password
  * @param user - user of type IUserLoginPayload
 * @returns Retourne a jwt token
 */
const login = async (user: IAuthPayload): Promise<AxiosResponse<jwttoken, any>> => {
  return await authhttp.put<jwttoken>('auth/login', user)
}

/**
 * signup - Signup user with username, email and password
  * @param user - user of type IuserCreatePayload
 * @returns Retourne a jwt token
 */
const signup = async (user: IUserAuthPayload): Promise<AxiosResponse<IUser, any>> => {
  user.role = 'Fider'
  return await authhttp.post<IUser>('auth/register', user)
}


const AuthServices = {
  login,
  signup
}

export default AuthServices
