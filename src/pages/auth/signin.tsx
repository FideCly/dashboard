import { IAuthPayload, jwttoken } from '@/Models/User';
import { setCookie } from 'cookies-next';
import { Label } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const onSubmit: SubmitHandler<IAuthPayload> = useCallback(async (data) => {
    try {
      const response = await fetch(`/api/auth/signin`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      } else {
        const user: jwttoken = await response.json();
        localStorage.setItem('userid', user.userUuid);
        // create a cookie
        setCookie('token', user.token, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        });

        toast('user connected', {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'success',
        });
        router.push('/');
      }
    } catch (error) {
      toast('user not connected', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error',
      });
      console.error(error);
    }
  }, []);

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 space-x-4 text-2xl font-semibold "
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
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl ">
              Sign in to your account
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-4"
            >
              <Label>Email address</Label>
              <input
                {...register('email', { required: true })}
                name="email"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              {errors.email && (
                <span className="text-sm text-red-600">
                  This field is required
                </span>
              )}

              <Label>Password</Label>
              <input
                {...register('password', { required: true })}
                name="password"
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              {errors.password && (
                <span className="text-sm text-red-600">
                  This field is required
                </span>
              )}
              <button
                type="submit"
                className="text-black bg-green-200 hover:bg-green-300"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Don't have an account yet?{' '}
                <Link
                  href="/auth/signup"
                  className="font-medium text-primary-600 hover:underline 500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
