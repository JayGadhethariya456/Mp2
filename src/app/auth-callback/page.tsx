"use client"
import { useRouter } from "next/router";
import { trpc } from "../_trpc/client";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const { post, origins } = router.query;

  // Function to handle authentication callback
  const handleAuthCallback = async (): Promise<void> => { // Specify return type
    try {
      const query = await trpc.authCallback.useQuery(undefined, {
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
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Call the authentication callback handler when the component mounts
  useEffect(() => {
    if (post) {
      handleAuthCallback();
    }
  }, [post, origins]); // Add dependencies

  // Render loading indicator while setting up the account
  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
        <h3 className="font-semibold text-xl">Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default Page;