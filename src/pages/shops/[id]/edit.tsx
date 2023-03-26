import { ShopUpdateForm} from "@/Components/form/ShopForm"
import { ShopService } from "@/Api/Services"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { IShop } from "@/Api/Models/Shop"

export default function ShopEditById() {
    const [shop, setShop] = useState<IShop>()
    const router = useRouter()
    // get id from url
    const { id } = router.query

 
    // get promotion by id
    const getShopById = async () => {
        try {
            const response = await ShopService.getShopById(id as string)
            setShop(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (router.isReady) getShopById();      
    }, [id]);

    return (
        <div>
            {shop && <ShopUpdateForm shop={shop} />}
        </div>
    )
}

