import React, { useCallback } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { IUserAuthPayload } from '@/Api/Models/User'
import { AuthServices } from '@/Api/Services'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'


export const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IUserAuthPayload>()
    const router = useRouter()
    const onSubmit: SubmitHandler<IUserAuthPayload> = useCallback(async (data) => {
        const res = await AuthServices.login(data)
        Cookies.set("token", res.data.token, { expires: 7 });
        router.push("/")
    }, [router])
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="submit-form">
            <div>
            <div className="form-group">
                <input
                {...register('email', { required: true, maxLength: 50})}
                type="text"
                className="w-full max-w-xs input"
                id="email"
                maxLength={50}
                placeholder='Email'
                />
                {errors.email && <span>This field is required</span>}
            </div>
    
            <div className="form-group">
                <input
                {...register('password', { required: true, maxLength: 50})}
                type="password"
                className="w-full max-w-xs input"
                id="password"
                maxLength={50}
                placeholder='Password'
                />
                {errors.password && <span>This field is required</span>}
            </div>
    
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
            </div>
        </div>
        </form>
    )
}

export const Register: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IUserAuthPayload>()
    const router = useRouter()
    const onSubmit: SubmitHandler<IUserAuthPayload> = useCallback(async (data) => {
        try{
            await AuthServices.signup(data)
            router.push('/auth/login')
        }catch(error){
            console.log(error)
        }
    }, [router])
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="submit-form">
            <div>
            <div className="form-group">
                <input
                {...register('email', { required: true, maxLength: 50})}
                type="text"
                className="w-full max-w-xs input"
                id="email"
                maxLength={50}
                placeholder='Email'
                />
                {errors.email && <span>This field is required</span>}
            </div>
    
            <div className="form-group">
                <input
                {...register('password', { required: true, maxLength: 50})}
                type="password"
                className="w-full max-w-xs input"
                id="password"
                maxLength={50}
                placeholder='Password'
                />
                {errors.password && <span>This field is required</span>}
            </div>
    
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
            </div>
        </div>
        </form>
    )
}

    

