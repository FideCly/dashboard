import React, { useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Label, Select, TextInput, Textarea } from 'flowbite-react'
import { CampaignServices, ShopService } from '@/Api/Services'
import { ICampaignCreatePayload, ICampaignUpdatePayload, ICampaign } from '@/Api/Models/Campaign'
import { IShop } from '@/Api/Models/Shop'


export const CampaignCreateForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ICampaignCreatePayload>()
    // get all shops for the select
    const [shops, setShops] = useState<IShop[]>([])
    const loadShops = useCallback(async () => {
        try {
            const { data } = await ShopService.getShops('')
            setShops(data)
        } catch (error) {
            console.error(error)
        }
    }, [])



    const [campaigns, setCampaigns] = useState<ICampaign[]>([])
    const onSubmit: SubmitHandler<ICampaignCreatePayload> = useCallback(async (data) => {
        try {
            await CampaignServices.createCampaign(data)
        } catch (error) {
            console.error(error)
        }
    }
        , [])

    return (
        <form onSubmit={handleSubmit(onSubmit)} data-cy='campaign-form' className="flex flex-col gap-4">
            <div className="">
                <Label htmlFor='libelle'>Nom de la campagne</Label>
                <TextInput
                    {...register('subject', { required: true, maxLength: 50 })}
                    type="text"
                    className=""
                    id="libelle"
                    maxLength={50}
                    placeholder='libelle'
                />
                {errors.subject && <span>This field is required</span>}
            </div>

            <div className="">
                <Label htmlFor='types'>Type de campagne</Label>
                <Textarea
                    {...register('message', { required: true, maxLength: 50 })}
                    className=""
                    id="types"
                    maxLength={50}
                    placeholder='types'
                />
                {errors.message && <span>This field is required</span>}
            </div>

            <div className="">
                <Label htmlFor='startAt'>Shop</Label>
                <Select
                    {...register('shop', { required: true, maxLength: 50 })}
                    className=""
                    id="startAt"
                    placeholder='startAt'
                >
                    {shops.map((shop) => (
                        <option key={shop.id} value={shop.id}>{shop.companyName}</option>
                    ))}
                </Select>
                {errors.shop && <span>This field is required</span>}
            </div>

            <div className="">
                <Label htmlFor='startAt'>Date de début</Label>
                <Select
                    {...register('targets', { required: true, maxLength: 50 })}
                    className=""
                    id="startAt"
                    placeholder='startAt'
                    multiple
                />
                {errors.targets && <span>This field is required</span>}
            </div>

            <Button type="submit" className='text-black bg-green-200 hover:bg-green-300'>
                Submit
            </Button>

        </form>
    )
}

export const CampaignUpdateForm: React.FC<{ campaign: ICampaign }> = ({ campaign }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<ICampaignUpdatePayload>({
        defaultValues: {
            subject: campaign.subject,
            message: campaign.message,
            shop: campaign.shop,
            targets: campaign.targets
        }
    })
    const [shops, setShops] = useState<IShop[]>([])
    const loadShops = useCallback(async () => {
        try {
            const { data } = await ShopService.getShops('')
            setShops(data)
        } catch (error) {
            console.error(error)
        }
    }, [])

    const [campaigns, setCampaigns] = useState<ICampaign[]>([])

    const onSubmit: SubmitHandler<ICampaignUpdatePayload> = useCallback(async (data) => {
        try {
            await CampaignServices.updateCampaign(campaign.id.toString(), data)
        } catch (error) {
            console.error(error)
        }
    }, [campaign.id])

    return (
        <form onSubmit={handleSubmit(onSubmit)} data-cy='campaign-form' className="flex flex-col gap-4">
            <div className="">
                <Label htmlFor='libelle'>Nom de la campagne</Label>
                <TextInput
                    {...register('subject', { required: true, maxLength: 50 })}
                    type="text"
                    className=""
                    id="libelle"
                    maxLength={50}
                    placeholder='libelle'
                />
                {errors.subject && <span>This field is required</span>}
            </div>

            <div className="">
                <Label htmlFor='types'>Type de campagne</Label>
                <Textarea
                    {...register('message', { required: true, maxLength: 50 })}
                    className=""
                    id="types"
                    maxLength={50}
                    placeholder='types'
                />
                {errors.message && <span>This field is required</span>}
            </div>

            <div className="">
                <Label htmlFor='startAt'>Shop</Label>
                <Select
                    {...register('shop', { required: true, maxLength: 50 })}
                    className=""
                    id="startAt"
                    placeholder='startAt'
                >
                    {shops.map((shop) => (
                        <option key={shop.id} value={shop.id}>{shop.companyName}</option>
                    ))}
                </Select>
                {errors.shop && <span>This field is required</span>}
            </div>

            <div className="">
                <Label htmlFor='startAt'>User cible</Label>
                <Select
                    {...register('targets', { required: true, maxLength: 50 })}
                    className=""
                    id="startAt"
                    placeholder='startAt'
                    multiple
                />
                {errors.targets && <span>This field is required</span>}
            </div>

            <Button type="submit" className='text-black bg-green-200 hover:bg-green-300'>
                Submit
            </Button>

        </form>
    )
}





