import { useState } from "react";
import { ModeToggle } from "../toggleTheme";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Github, Home } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/router";

export const Header = ({ setStep }: { setStep: (value: number) => void }) => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="w-full text-sm flex gap-4 flex-col-reverse md:flex-row">
      <div className="flex w-full justify-center md:justify-start bg-none self-center">
        <Button
          onClick={() => {
            setStep(0);
            router.push("/");
          }}
          variant="outline"
          className="px-2.5 mr-2"
        >
          <Home size={20} />
        </Button>
        <a
          href="https://github.com/pubky/selfie-records"
          target="_blank"
          className="mr-2"
        >
          <Button variant="outline" className="px-2.5">
            <Github size={20} />
          </Button>
        </a>
        <ModeToggle />
      </div>
      <div className="grow"></div>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <div
              onClick={() => copyToClipboard(`npm i selfie-records`)}
              className="cursor-pointer flex w-full m-auto max-w-[290px] text-center justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200  backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit rounded-xl border lg:bg-gray-200 p-4 lg:dark:bg-zinc-800/30"
            >
              <code
                className={`font-mono font-bold ${
                  copied ? "text-green-500" : "text-black dark:text-white"
                } `}
              >
                npm i selfie-records
              </code>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Click to Copy</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
