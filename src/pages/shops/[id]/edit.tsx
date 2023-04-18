import { useEffect, useState } from 'react'
import { ShopUpdateForm } from '@/Components/form/ShopForm'
import { ShopService } from '@/Api/Services'
import { IShop } from '@/Api/Models/Shop'
import { useRouter } from 'next/router'

export default function ShopEditById() {
    const [shop, setShop] = useState<IShop>()
    const router = useRouter()
    const { id } = router.query
    // get shop by id
    const getShopById = async () => {
        try {
            const response = await ShopService.getShopById(id as string)
            setShop(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getShopById()
    }, [id])
    
    
    return (
        <div>
        <ShopUpdateForm shop={shop!} />
        </div>
    )
}
