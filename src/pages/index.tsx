import Head from 'next/head';
import Login from '@components/Login';
import { useAuth } from '@hooks/use-auth';
import { createCheckoutSession } from '@utils/stripe/createCheckoutSession';
import usePremiumStatus from '@utils/stripe/usePremiumStatus';
import { appName } from '@constants';

export default function Home() {
  const auth = useAuth();
  const userIsPremium = usePremiumStatus(auth.user);

  return (
    <>
      <Head>
        <title>{appName}</title>
        <meta
          name="description"
          content="Ready-to-use project built with Next.js + Firebase + Typescript + Tailwind + Stripe"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto max-w-4xl">
        {!auth.user && (
          <>
            <h1 className="mt-10 mb-10 text-2xl font-extrabold py-2">
              Next.js + Firebase + Typescript + Tailwind + Stripe
            </h1>

            <p className="py-2">Get started quickly with this!</p>

            <Login />
          </>
        )}

        {auth.user && (
          <div>
            <h1 className="mt-10 mb-10 text-2xl font-extrabold py-2">
              Hello, {auth.user.displayName}
            </h1>
            {!userIsPremium ? (
              <>
                <button
                  onClick={() => createCheckoutSession(auth.user.uid)}
                  type="button"
                  className="bg-yellow-400 hover:bg-yellow-500 rounded p-2"
                >
                  Upgrade to premium!
                </button>
              </>
            ) : (
              <p className="py-2">Thanks for being a premium member!</p>
            )}
            <button
              onClick={() => auth.signout()}
              type="button"
              className="text-white bg-red-600 hover:bg-red-700 rounded p-2"
            >
              Log out
            </button>
          </div>
        )}
      </main>
    </>
  );
}
