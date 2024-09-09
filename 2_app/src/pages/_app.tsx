import { useState } from "react";
import type { AppProps } from "next/app";

import { ThemeProvider } from "@/contexts/useTheme";
import { RecordsProvider } from "@/contexts/useRecords";

import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";

import { Inter } from "next/font/google";

import "@/styles/globals.css";

export const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const [step, setStep] = useState(0);

  return (
    <RecordsProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        themes={["light", "dark"]}
      >
        <main
          className={`flex min-h-screen flex-col items-center p-6 container w-[380px] sm:w-[600px] md:w-[720px] lg:w-[900px] xl:w-[1200px] ${inter.className}`}
        >
          <Header setStep={setStep} />
          <div className="grow" />
          <Component step={step} setStep={setStep} {...pageProps} />
          <div className="grow" />
          <Footer />
        </main>
      </ThemeProvider>
    </RecordsProvider>
  );
}
