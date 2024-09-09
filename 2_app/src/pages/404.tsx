import Head from "next/head";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";

export default function Custom404() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>404 Not Found | Selfie Records</title>
        <meta name="description" content="Page not found." />
      </Head>
      <div className="flex-grow" />
      <section className="flex flex-col items-center w-full lg:px-24 space-y-8">
        <div className="text-center">
          <h1 className="text-8xl font-bold leading-tight">404</h1>
          <p className="mt-4 text-4xl text-gray-500">
            Oops! The page you`re looking for isn`t here.
          </p>
        </div>
        <p className="text-xl text-gray-300 ">
          You might have the wrong url, or the page may have moved.
        </p>
        <Button
          variant="secondary"
          onClick={() => router.push("/")}
          className="mt-4 px-8 py-6 text-white bg-gray-800 rounded-full"
        >
          <ArrowLeft size={24} className="mr-2" />
          Go Home
        </Button>
      </section>
    </>
  );
}
