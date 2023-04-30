import { type AxiosResponse } from 'axios'
import {httpCommon} from '../http-common'
import type {IShop, IShopCreatePayload, IShopUpdatePayload} from '../Models/Shop'
import Cookies from 'js-cookie'

/**
 * Récupère la liste des shops
 * @returns Retourne une promesse de type Shop[]
 * @see Shop
 * @see src/Types/Shop.ts
 * @see src/Api/Models/Shop.ts
*/
const getShops = async (): Promise<AxiosResponse<IShop[], any>> => {
  return await httpCommon.get<IShop[]>('/shop', {
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + Cookies.get('next-auth.session-token'),
    },
  })
}

/**
 * Récupère la la shop par son id
 * @param id - Id de la shop
 * @returns Retourne une promesse de type Shop
 * @see Shop
 * @see src/Types/Shop.ts
 */
const getShopById = async (id: string): Promise<AxiosResponse<IShop, any>> => {
  return await httpCommon.get<IShop>(`/shop/${id}`)
}

/**
 * Met à jour la shop
 * @param id - Id de la shop
 * @param shop - Nouvelle shop
 * @returns Retourne une promesse de type Shop
 * @see Shop
 * @see src/Types/Shop.ts
 */
const updateShop = async (id: string, shop: IShopUpdatePayload): Promise<AxiosResponse<IShopUpdatePayload, any>> => {
  return await httpCommon.post<IShopUpdatePayload>(`/shop/${id}`, shop)
}

/**
 * Crée une shop
 * @param shop - Nouvelle shop
 * @returns Retourne une promesse de type Shop
 * @see Shop
 * @see src/Types/Shop.ts
 */
const createShop = async (shop: IShopCreatePayload): Promise<AxiosResponse<IShopCreatePayload, any>> => {
  return await httpCommon.post<IShopCreatePayload>('/shop/', shop)
}

/**
 * delete une shop
 * @param id - Id de la shop
 * @returns
 * @see Shop
 * @see src/Types/Shop.ts
 */
const deleteShop = async (id: string): Promise<AxiosResponse<IShop, any>> => {
  return await httpCommon.delete<IShop>(`/shop/${id}`)
}

const ShopService = {
  getShops,
  getShopById,
  updateShop,
  createShop,
  deleteShop
}

export default ShopService
