import Head from "next/head";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/breadcrumbs";

export default function Custom404() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Tutorials | Selfie Records</title>
        <meta name="description" content="Page not found." />
      </Head>
      <section className="flex flex-col items-center w-full lg:px-24 space-y-8">
        <div className="text-center">
          <h1 className="text-8xl font-bold leading-tight">Tutorials</h1>
          <p className="mt-4 text-4xl text-gray-500">Coming soon!</p>
        </div>
        {/* <div className="mt-4 w-full pl-3">
          <Breadcrumbs
            items={[{ name: "Home", path: "/" }, { name: "Tutorials" }]}
          />
        </div> */}
        <p className="text-xl text-gray-300 ">Oops! Check back later.</p>
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
