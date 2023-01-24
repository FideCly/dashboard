import { type AxiosResponse } from 'axios'
import http from '../http-common'
import type Shop from '../Models/Shop'

/**
     * Récupère la liste des shops
     * @returns Retourne une promesse de type Shop[]
     * @see Shop
     * @see src/Types/Shop.ts
     * @see src/Api/Models/Shop.ts
    */
const getShops = async (): Promise<AxiosResponse<Shop[], any>> => {
    return await http.get<Shop[]>('/shops')
}

/**
     * Récupère la la shop par son id
     * @param id - Id de la shop
     * @returns Retourne une promesse de type Shop
     * @see Shop
     * @see src/Types/Shop.ts
     */
const getShopById = async (id: string): Promise<AxiosResponse<Shop, any>> => {
    return await http.get<Shop>(`/shops/${id}`)
}

/**
     * Met à jour la shop
     * @param id - Id de la shop
     * @param shop - Nouvelle shop
     * @returns Retourne une promesse de type Shop
     * @see Shop
     * @see src/Types/Shop.ts
     */
const updateShop = async (id: string, shop: Shop): Promise<AxiosResponse<Shop, any>> => {
    return await http.post<Shop>(`/shops/${id}`, shop)
}

/**
     * Crée une shop
     * @param shop - Nouvelle shop
     * @returns Retourne une promesse de type Shop
     * @see Shop
     * @see src/Types/Shop.ts
     */
const createShop = async (shop: Shop): Promise<AxiosResponse<Shop, any>> => {
    return await http.post<Shop>('/shops/', shop)
}

/**
     * delete une shop
     * @param id - Id de la shop
     * @returns
     * @see Shop
     * @see src/Types/Shop.ts
     */
const deleteShop = async (id: string): Promise<AxiosResponse<Shop, any>> => {
    return await http.delete<Shop>(`/shops/${id}`)
}

const ShopService = {
    getShops,
    getShopById,
    updateShop,
    createShop,
    deleteShop
}

export default ShopService
