import { useEffect, useState } from 'react'
import {PromotionUpdateForm} from '@/Components/form/Promotion.form'
import { PromotionService } from '@/Api/Services'
import { IPromotions } from '@/Api/Models/Promotions'
import { useRouter } from 'next/router'
import Sidebar from '@/Components/html/Sidebar'

export default function PromotionEditById() {
    const [promotion, setPromotion] = useState<IPromotions>()
    const router = useRouter()
    const { id } = router.query
    // get promotion by id

    useEffect(() => {
        const getPromotionById = async () => {
            try {
                const response = await PromotionService.getPromotionById(id as string)
                setPromotion(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getPromotionById()
    }, [id])
    
    
    return (
        <div>
            {promotion && <PromotionUpdateForm promotion={promotion} />}
        </div>
    )
}

PromotionEditById.getLayout = (page) => (
    <div className='flex'>
    <Sidebar />
    {page}
    </div>
)
