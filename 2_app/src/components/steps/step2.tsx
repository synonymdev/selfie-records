import { useState } from "react";
import { useRouter } from "next/router";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, Book, CheckIcon, ClipboardIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRecordsContext } from "@/contexts/useRecords";
import { CopyBlock, dracula } from "react-code-blocks";

export type Records = {
  records: {
    [key: string]: {
      value: string;
      error: string;
    };
  };
};

export const Step2 = ({
  records,
  name,
  setStep,
}: {
  records: Records | null;
  name: string;
  setStep: (value: number) => void;
}) => {
  const { resetRecords, dnsServer } = useRecordsContext();
  const router = useRouter();

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const userFromAddressEmail = name.split("@")[0];
  const domainFromAddressEmail = name.split("@")[1];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-full text-center h-full">
      <h1 className="text-6xl font-bold text-[65px]">Your Records</h1>
      <div className="text-[24px] mt-6 mb-8 dark:text-gray-400">
        We found these{" "}
        <b className="text-black dark:text-white">DNS TXT records</b> for:
        <span className="flex justify-center text-[20px] sm:text-[32px] mt-4 text-black dark:text-white break-all">
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <b
                  className={`mt-2 cursor-pointer transition ${
                    copiedEmail
                      ? "text-green-500"
                      : "text-black dark:text-white"
                  }`}
                  onClick={() => {
                    copyToClipboard(name);
                    setCopiedEmail(true);
                    setTimeout(() => {
                      setCopiedEmail(false);
                    }, 2000);
                  }}
                >
                  {name}
                </b>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Click to Copy</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </span>
      </div>
      <div className="m-auto w-full text-left">
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-[625px] m-auto"
        >
          {records &&
            Object.keys(records.records).map((key, index) => {
              let txtKey = `${userFromAddressEmail}.user._${key}.${domainFromAddressEmail}`;

              if (!name.includes("@")) {
                txtKey = `_${key}.${name}`;
              }

              const code = `import { getRecords } from "selfie-records";

const records = getRecords({ 
  name: "${name}",
  filter: ["${key}"],
  dnsServer: "${dnsServer}"
});

console.log(records);`;
              return (
                <AccordionItem
                  className="w-full max-w-[750px]"
                  key={`${key}-${index}`}
                  value={`item-${index}`}
                >
                  <AccordionTrigger
                    className={`hover:no-underline ${
                      records.records[key].value === ""
                        ? "text-gray-600"
                        : "text-black dark:text-white"
                    }`}
                  >
                    <span>{`${key}`}</span>
                    <div className="grow"></div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Tabs
                      defaultValue="records"
                      className="w-full transition-all"
                    >
                      <TabsList className="w-full flex justify-start px-1 rounded-b-none">
                        <TabsTrigger className="rounded-full" value="records">
                          TXT Records
                        </TabsTrigger>
                        <TabsTrigger className="rounded-full" value="code">
                          Code
                        </TabsTrigger>
                        <TabsTrigger className="rounded-full" value="terminal">
                          Terminal
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent
                        value="records"
                        className="pl-6 pr-6 pt-4 pb-4 border-2 rounded-lg rounded-t-none border-dark -mt-1"
                      >
                        <span className="text-gray-400">TXT key</span>
                        <div className="text-[16px] mt-2 mb-6">
                          <CopyBlock
                            theme={dracula}
                            text={txtKey}
                            wrapLongLines={true}
                            language={"javascript"}
                            showLineNumbers={false}
                            customStyle={{
                              padding: "15px 20px",
                              marginBottom: "20px",
                              marginTop: "10px",
                              borderRadius: "10px",
                            }}
                          />
                        </div>
                        <div className="grow"></div>
                        {records.records[key].error !== "" && (
                          <div className="text-red-500">
                            {records.records[key].error}
                          </div>
                        )}

                        {records.records[key].value !== "" && (
                          <>
                            <div className="mt-2 mb-1 text-gray-400">
                              TXT value
                            </div>
                            <div className="break-all text-[16px]">
                              <CopyBlock
                                theme={dracula}
                                text={records.records[key].value}
                                wrapLongLines={true}
                                language={"javascript"}
                                showLineNumbers={false}
                                customStyle={{
                                  padding: "15px 20px",
                                  marginBottom: "20px",
                                  marginTop: "10px",
                                  borderRadius: "10px",
                                }}
                              />
                            </div>
                          </>
                        )}
                      </TabsContent>
                      <TabsContent
                        value="code"
                        className="pl-6 pr-6 pt-4 pb-4 border-2 rounded-lg rounded-t-none border-dark -mt-1"
                      >
                        <div className="mt-2 mb-1 text-gray-400">
                          Using JS SDK
                        </div>
                        <CopyBlock
                          theme={dracula}
                          text={code}
                          wrapLongLines={true}
                          language={"javascript"}
                          showLineNumbers={true}
                          customStyle={{
                            padding: "0px 10px 0px 10px",
                            marginBottom: "20px",
                            marginTop: "10px",
                            borderRadius: "10px",
                            overflow: "auto",
                          }}
                        />
                        <div className="flex flex-row">
                          <Button
                            variant="secondary"
                            className="ml-2 mt-4 rounded-full"
                            onClick={() => router.push("/sdk")}
                          >
                            <Book className="mr-2 h-4 w-4" />
                            <p>Read the docs</p>
                          </Button>
                        </div>
                      </TabsContent>
                      <TabsContent
                        value="terminal"
                        className="pl-6 pr-6 pt-4 pb-4 border-2 rounded-lg rounded-t-none border-dark -mt-1"
                      >
                        <div className="mt-2 mb-1 text-gray-400">
                          dig command
                        </div>
                        <CopyBlock
                          theme={dracula}
                          text={`dig @1.1.1.1 txt ${txtKey}`}
                          wrapLongLines={true}
                          language={"bash"}
                          showLineNumbers={false}
                          customStyle={{
                            padding: "15px 20px",
                            marginBottom: "20px",
                            marginTop: "10px",
                            borderRadius: "10px",
                          }}
                        />
                        <a href="https://man.openbsd.org/dig.1" target="_blank">
                          <Button
                            variant="secondary"
                            className="ml-2 mt-4 rounded-full"
                          >
                            <Book className="mr-2 h-4 w-4" />
                            <p>Read the docs</p>
                          </Button>
                        </a>
                      </TabsContent>
                    </Tabs>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
        </Accordion>
      </div>
      <div className="mt-6 gap-4 flex flex-col sm:flex-row justify-center">
        <Button
          variant="secondary"
          className="w-full md:max-w-[250px] rounded-full mt-8 py-8 text-lg font-semibold"
          onClick={() => {
            setStep(0);

            const newUrl = `${window.location.origin}`;
            window.history.pushState({ path: newUrl }, "", newUrl);

            resetRecords();
          }}
        >
          <ArrowLeftIcon className="mr-3 h-4 w-4" />
          <p>Search Again</p>
        </Button>
        <Button
          variant="default"
          className="w-full md:max-w-[250px] rounded-full sm:mt-8 py-8 text-lg font-semibold"
          onClick={() => {
            const newUrl = `${window.location.toString()}`;

            copyToClipboard(newUrl);
            setCopiedUrl(true);
            setTimeout(() => {
              setCopiedUrl(false);
            }, 2000);
          }}
        >
          {copiedUrl ? (
            <>
              <CheckIcon className="mr-3 h-4 w-4" />
              <p>Copied URL</p>
            </>
          ) : (
            <>
              <ClipboardIcon className="mr-3 h-4 w-4" />
              <p>Copy URL</p>
            </>
          )}{" "}
        </Button>
      </div>
    </div>
  );
};
