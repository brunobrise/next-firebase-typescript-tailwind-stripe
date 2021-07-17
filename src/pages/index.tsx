import Head from 'next/head';
import Login from '@components/Login';
import firebase from '@utils/firebase/firebaseClient';
import { useAuthState } from 'react-firebase-hooks/auth';
import { createCheckoutSession } from '@utils/stripe/createCheckoutSession';
import usePremiumStatus from '@utils/stripe/usePremiumStatus';
import { appName } from '@constants';

export default function Home() {
  const [user, userLoading] = useAuthState(firebase.auth());
  const userIsPremium = usePremiumStatus(user);

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
        {!user && userLoading && (
          <h1 className="mt-10 mb-10 text-2xl font-extrabold py-2">Loading</h1>
        )}

        {!user && !userLoading && (
          <>
            <h1 className="mt-10 mb-10 text-2xl font-extrabold py-2">
              Next.js + Firebase + Typescript + Tailwind + Stripe
            </h1>

            <p className="py-2">Get started quickly with this!</p>

            <Login />
          </>
        )}

        {user && !userLoading && (
          <div>
            <h1 className="mt-10 mb-10 text-2xl font-extrabold py-2">
              Hello, {user.displayName}
            </h1>
            {!userIsPremium ? (
              <>
                <button
                  onClick={() => createCheckoutSession(user.uid)}
                  type="button"
                  className="bg-yellow-400 hover:bg-yellow-500 rounded p-2"
                >
                  Upgrade to premium!
                </button>
              </>
            ) : (
              <p className="py-2">Thanks for being a premium member!</p>
            )}
          </div>
        )}
      </main>
    </>
  );
}
