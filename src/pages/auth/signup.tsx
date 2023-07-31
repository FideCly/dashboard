import React, { useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IUserAuthPayload } from '@/Models/User';
import { useRouter } from 'next/router';
import { Label } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';

export default function signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserAuthPayload>();
  const router = useRouter();
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
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        >
          <Image
            src="/logo.png"
            width={60}
            height={40}
            className="rounded"
            alt="logo"
          />
          Fidecly
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign up to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <Label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your email
                </Label>
                <input
                  {...register('email', { required: true, maxLength: 50 })}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                />
                {errors.email && <span>This field is required</span>}
              </div>
              <div>
                <Label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Password
                </Label>
                <input
                  {...register('password', { required: true, maxLength: 50 })}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
                {errors.password && <span>This field is required</span>}
              </div>
              <button
                type="submit"
                className="text-black bg-green-200 hover:bg-green-300"
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Already have a account?
                <Link
                  href="/auth/signin"
                  className="text-black bg-green-200 hover:bg-green-300"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
