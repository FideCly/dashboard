import React, { useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Label, TextInput, Textarea } from 'flowbite-react'
import { CampaignServices } from '@/Api/Services'
import { ICampaignCreatePayload, ICampaignUpdatePayload, ICampaign } from '@/Api/Models/Campaign'


export const CampaignCreateForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ICampaignCreatePayload>()
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
                    {...register('libelle', { required: true, maxLength: 50 })}
                    type="text"
                    className=""
                    id="libelle"
                    maxLength={50}
                    placeholder='libelle'
                />
                {errors.libelle && <span>This field is required</span>}
            </div>
            <div className="">
                <Label htmlFor='types'>Type de campagne</Label>
                <TextInput
                    {...register('types', { required: true, maxLength: 50 })}
                    type="text"
                    className=""
                    id="types"
                    maxLength={50}
                    placeholder='types'
                />
                {errors.types && <span>This field is required</span>}
            </div>
            <div className='flex space-x-2'>
            <div className="flex-1">
                <Label htmlFor='startAt'>Debut de campagne</Label>
                <TextInput
                    {...register('startAt', { required: true, maxLength: 50 })}
                    type="text"
                    className=""
                    id="startAt"
                    maxLength={50}
                    placeholder='startAt'
                />
                {errors.startAt && <span>This field is required</span>}
            </div>

            <div className="flex-1">
                <Label htmlFor='endAt'>Fin de campagne</Label>
                <TextInput
                    {...register('endAt', { required: true, maxLength: 50 })}
                    type="text"
                    className=""
                    id="endAt"
                    maxLength={50}
                    placeholder='endAt'
                />
                {errors.endAt && <span>This field is required</span>}
            </div>
            </div>
            <div className="">
                <Label htmlFor='template'>Maquette email</Label>
                <Textarea
                    {...register('template', { required: true, maxLength: 50 })}
                    className=""
                    id="template"
                    maxLength={50}
                    placeholder='template'
                />
                {errors.template && <span>This field is required</span>}
            </div>

            <Button type="submit" className="text-black bg-green-200 hover:bg-green-300">Submit</Button>
        </form>
    )
}

export const CampaignUpdateForm: React.FC<{ campaign: ICampaign }> = ({ campaign }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<ICampaignUpdatePayload>({
        defaultValues: {
            libelle: campaign.libelle,
            types: campaign.types,
            startAt: campaign.startAt,
            endAt: campaign.endAt,
            template: campaign.template,
        }
    })

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
                    {...register('libelle', { required: true, maxLength: 50 })}
                    type="text"
                    className=""
                    id="libelle"
                    maxLength={50}
                    placeholder='libelle'
                />
                {errors.libelle && <span>This field is required</span>}
            </div>
            <div className="">
                <Label htmlFor='types'>Type de campagne</Label>
                <TextInput
                    {...register('types', { required: true, maxLength: 50 })}
                    type="text"
                    className=""
                    id="types"
                    maxLength={50}
                    placeholder='types'
                />
                {errors.types && <span>This field is required</span>}
            </div>
            <div className='flex space-x-2'>
            <div className="flex-1">
                <Label htmlFor='startAt'>Debut de campagne</Label>
                <TextInput
                    {...register('startAt', { required: true, maxLength: 50 })}
                    type="text"
                    className=""
                    id="startAt"
                    maxLength={50}
                    placeholder='startAt'
                />
                {errors.startAt && <span>This field is required</span>}
            </div>

            <div className="flex-1">
                <Label htmlFor='endAt'>Fin de campagne</Label>
                <TextInput
                    {...register('endAt', { required: true, maxLength: 50 })}
                    type="text"
                    className=""
                    id="endAt"
                    maxLength={50}
                    placeholder='endAt'
                />
                {errors.endAt && <span>This field is required</span>}
            </div>
            </div>
            <div className="">
                <Label htmlFor='template'>Maquette email</Label>
                <Textarea
                    {...register('template', { required: true, maxLength: 50 })}
                    className=""
                    id="template"
                    maxLength={50}
                    placeholder='template'
                />
                {errors.template && <span>This field is required</span>}
            </div>

            <Button type="submit" className="text-black bg-green-200 hover:bg-green-300">Submit</Button>
        </form>
    )
}





