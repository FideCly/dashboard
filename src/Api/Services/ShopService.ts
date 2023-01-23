import http from "../http-common";
import Shop from "../Models/Shop";

    /**
     * Récupère la liste des shops
     * @returns Retourne une promesse de type Shop[]
     * @see Shop
     * @see src/Types/Shop.ts
     * @see src/Api/Models/Shop.ts
     */
    const getShops = () =>{
        return http.get<Shop[]>("/shops");
        }

    /**
     * Récupère la la shop par son id
     * @param id - Id de la shop
     * @returns Retourne une promesse de type Shop
     * @see Shop
     * @see src/Types/Shop.ts
     */
    const getShopById = (id: string) => {
        return http.get<Shop>(`/shops/${id}`);
        }

    /**
     * Met à jour la shop
     * @param id - Id de la shop
     * @param shop - Nouvelle shop
     * @returns Retourne une promesse de type Shop
     * @see Shop
     * @see src/Types/Shop.ts
     */
    const updateShop = (id: string, shop: Shop) => {
        return http.post<Shop>(`/shops/${id}` ,"PUT",{ data: shop });
        }

    /**
     * Crée une shop
     * @param shop - Nouvelle shop
     * @returns Retourne une promesse de type Shop
     * @see Shop
     * @see src/Types/Shop.ts
     */
    const createShop = (shop: Shop) => {
        return http.post<Shop>(`/shops/`,{ data: shop });
        }

    /**
     * delete une shop
     * @param id - Id de la shop
     * @returns
     * @see Shop
     * @see src/Types/Shop.ts
     */
    const deleteShop = (id: string) => {
        return http.delete<Shop>(`/shops/${id}`);
        }
    
    const ShopService = {
        getShops,
        getShopById,
        updateShop,
        createShop,
        deleteShop,
    }

    export default ShopService;
