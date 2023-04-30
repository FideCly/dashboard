import { useEffect, useState } from 'react'
import { ShopUpdateForm } from '@/Components/form/Shop.form'
import { ShopService } from '@/Api/Services'
import { IShop } from '@/Api/Models/Shop'
import { useRouter } from 'next/router'
import Navbar from '@/Components/html/Navbar'

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
        {shop && <ShopUpdateForm shop={shop} />}
        </div>
    )
}
ShopEditById.getLayout = (page) => (
    <div className='flex'>
    <Navbar />
    {page}
    </div>
)
