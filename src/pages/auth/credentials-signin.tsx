import { Button, Label } from 'flowbite-react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { getCsrfToken } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
              method="post"
              action="/api/auth/callback/credentials"
              className="space-y-4 md:space-y-6"
            >
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <Label>
                Email address
                <input
                  name="email"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </Label>
              <Label>
                Password
                <input
                  name="password"
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </Label>
              <Button
                type="submit"
                className="text-black bg-green-200 hover:bg-green-300"
              >
                Sign in
              </Button>
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
