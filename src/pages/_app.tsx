import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
config.autoAddCss = false;
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import Consent from '@/Components/Consent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//@typescript-eslint/no-empty-interface
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <SessionProvider session={session}>
      <main className="flex-1 p-8 bg-grey-500 dark:bg-grey-500">
        <ThemeProvider attribute="class">
          <Component {...pageProps} />
          <Consent />
        </ThemeProvider>
      </main>
      <ToastContainer />
    </SessionProvider>,
  );
}
