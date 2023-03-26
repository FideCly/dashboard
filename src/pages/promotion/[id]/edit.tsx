import { useEffect, useState } from 'react'
import {UpdatePromotionForm} from '@/Components/form/PromotionForm'
import { PromotionService } from '@/Api/Services'
import { IPromotions } from '@/Api/Models/Promotions'
import { useRouter } from 'next/router'

export default function PromotionEditById() {
    const [promotion, setPromotion] = useState<IPromotions>()
    const router = useRouter()
    const { id } = router.query
    
    // get promotion by id
    const getPromotionById = async () => {
        try {
            const response = await PromotionService.getPromotionById(id as string)
            setPromotion(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (router.isReady) getPromotionById()     
    }, [id])
    
    
    return (
        <div>
            {promotion && <UpdatePromotionForm promotion={promotion} />}
        </div>
    )
}
