import React, { useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IUserAuthPayload } from '@/Models/User';
import { useRouter } from 'next/router';
import { Label } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';

export default function signup() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserAuthPayload>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<IUserAuthPayload> = useCallback(
    async (data) => {
      data.role = 'Fider';
      const endpoint = '/api/auth/signup';
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      try {
        const response = await fetch(endpoint, options);
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        } else {
          router.push('/auth/signin');
        }
      } catch (error) {
        console.log(error);
      }
    },
    [router],
  );

  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto gap-y-10 md:h-screen lg:py-0">
        <Image src="/logo.svg" width={400} height={100} alt="logo" />
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              S'inscrire
            </h1>
            <form
              className="flex flex-col space-y-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Label>Email</Label>
              <input
                {...register('email', { required: "L'email est requis" })}
                name="email"
                type="email"
                placeholder="hello@fidelcly.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
              />
              {errors.email && (
                <span className="text-red-600 text-sm">
                  {errors.email.message.toString()}
                </span>
              )}

              <Label>Mot de passe</Label>
              <input
                {...register('password', {
                  required: 'Le mot de passe est requis',
                  minLength: 8,
                })}
                name="password"
                type="password"
                minLength={8}
                placeholder="********"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
              />
              {errors.password && (
                <span className="text-red-600 text-sm">
                  {errors.password.message.toString()}
                </span>
              )}

              <button
                type="submit"
                className="p-2 w-full m-auto text-gray-50 font-medium rounded-lg bg-fidgreen hover:bg-fidgreen/80"
              >
                S'inscrire
              </button>

              <p className="text-sm font-light text-gray-500 text-right">
                Déja inscrit ?{' '}
                <Link
                  href="/auth/signin"
                  className="font-medium text-gray-600 hover:text-fidgreen hover:underline"
                >
                  Se connecter
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
