import React, { useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IUserAuthPayload } from '@/Models/User';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Label, TextInput } from 'flowbite-react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

export const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserAuthPayload>();
  const router = useRouter();
  const onSubmit: SubmitHandler<IUserAuthPayload> = useCallback(
    async (data) => {
      const endpoint = '/api/auth/login';
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const res = await fetch(endpoint, options).then(async (res) => {
        if (res.status >= 400) {
          throw new Error('Bad response from server');
        }
        return await res.json();
      });
      Cookies.set('token', res.data.token, { expires: 7 });
      router.push('/');
    },
    [router],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="submit-form">
        <div>
          <div className="form-group">
            <input
              {...register('email', { required: true, maxLength: 50 })}
              type="text"
              className="w-full max-w-xs input"
              id="email"
              maxLength={50}
              placeholder="Email"
            />
            {errors.email && <span>This field is required</span>}
          </div>

          <div className="form-group">
            <input
              {...register('password', { required: true, maxLength: 50 })}
              type="password"
              className="w-full max-w-xs input"
              id="password"
              maxLength={50}
              placeholder="Password"
            />
            {errors.password && <span>This field is required</span>}
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export const Register: React.FC = () => {
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
        await fetch(endpoint, options).then(async (res) => {
          if (res.status >= 400) {
            throw new Error('Bad response from server');
          }
          return await res.json();
        });
        router.push('/');
      } catch (error) {
        console.log(error);
      }
    },
    [router],
  );

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
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
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <Label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </Label>
                <TextInput
                  {...register('email', { required: true, maxLength: 50 })}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
                {errors.email && <span>This field is required</span>}
              </div>
              <div>
                <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </Label>
                <TextInput
                  {...register('password', { required: true, maxLength: 50 })}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.password && <span>This field is required</span>}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have a account?{' '}
                <button
                  onClick={() => signIn()}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign in
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
