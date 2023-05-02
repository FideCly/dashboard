import { useEffect, useState } from 'react'
import { PromotionService } from '@/Api/Services'
import { IPromotions } from '@/Api/Models/Promotions'
import { useRouter } from 'next/router'
import Navbar from '@/Components/html/Navbar'

export default function PromotionViewById() {
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
    }, [setPromotion, id])
    
    
    return (
        <div>
        <h1>{promotion?.name}</h1>
        <p>{promotion?.description}</p>
        <p>{promotion?.startAt?.toDateString()} </p>
        <p>{promotion?.endAt?.toDateString()}</p>
        </div>
    )
}

PromotionViewById.getLayout = (page) => (
    <div className='flex'>
    <Navbar />
    {page}
    </div>
)
