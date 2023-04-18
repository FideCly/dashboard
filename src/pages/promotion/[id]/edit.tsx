import { useEffect, useState } from 'react'
import {PromotionUpdateForm} from '@/Components/form/PromotionForm'
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
        getPromotionById()
    }, [id])
    
    
    return (
        <div>
            {promotion && <PromotionUpdateForm promotion={promotion} />}
        </div>
    )
}
