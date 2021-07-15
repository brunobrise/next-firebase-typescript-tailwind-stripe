import Head from 'next/head';
import Login from '../components/Login';

export default function Home() {
  return (
    <>
      <Head>
        <title>Next.js + Firebase + Typescript + Tailwind + Stripe</title>
        <meta
          name='description'
          content='Ready-to-use project built with Next.js + Firebase + Typescript + Tailwind + Stripe'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='container mx-auto max-w-4xl'>
        <h1 className='mt-10 mb-10 text-2xl font-extrabold py-2'>
          Next.js + Firebase + Typescript + Tailwind + Stripe
        </h1>

        <p className='py-2'>Get started quickly with this!</p>

        <Login />
      </main>
    </>
  );
}
