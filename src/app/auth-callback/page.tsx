"use client"
import { useRouter } from "next/router";
import { trpc } from "../_trpc/client";
import { Loader2 } from "lucide-react";
import ErrorPage from 'next/error';

const Page = () => {
  const router = useRouter();

  const isFallback = 'isFallback' in router ? router.isFallback : false;
  const { post, origins } = router.query;

  if (!isFallback && !post) {
    return <ErrorPage statusCode={404} />;
  }

  const query = trpc.authCallback.useQuery(undefined, {
    retry: true,
    retryDelay: 500,
  });

  if (query.error) {
    const errData = query.error.data;
    if (errData?.code === 'UNAUTHORIZED') {
      router.push('/sign-in');
    } else {
      console.error("An error occurred:", query.error);
    }
  }

  if (query.data?.success) {
    router.push(origins ? `/${origins}` : '/dashboard');
  }

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2  className="h-8 w-8 animate-spin text-zinc-800"/>
        <h3 className="font-semibold text-xl">Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default Page;
