import { FormEvent, useEffect, useState } from "react";
import { LoaderIcon, Telescope } from "lucide-react";
import { AddCustomTXT } from "@/components/addCustomTXT";
import { Button } from "@/components/ui/button";

export const Step1 = ({
  onSubmit,
  setError,
  error,
  searching,
  name,
  setName,
}: {
  error: string | null;
  setError: (value: string | null) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  searching: boolean;
  name: string;
  setName: (value: string) => void;
}) => {
  const [placeholder, setPlaceholder] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [typingEffect, setTypingEffect] = useState(true);

  const placeholderTexts = [
    "user@sub.domain.com",
    "sub.domain.com",
    "domain.com",
  ];

  useEffect(() => {
    if (typingEffect) {
      const interval = setInterval(() => {
        const text = placeholderTexts[placeholderIndex];
        if (placeholder.length < text.length) {
          setPlaceholder((current) => current + text.charAt(current.length));
        } else {
          clearInterval(interval);
          setTimeout(() => setTypingEffect(false), 2000); // Pause before deleting
        }
      }, 150);
      return () => clearInterval(interval);
    } else {
      const timeout = setTimeout(() => {
        if (placeholder.length > 0) {
          setPlaceholder((current) => current.slice(0, -1));
        } else {
          setTimeout(() => {
            setPlaceholderIndex(
              (current) => (current + 1) % placeholderTexts.length
            );
            setTypingEffect(true);
          }, 500); // Pause before starting to type next placeholder
        }
      }, 100);
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeholder, typingEffect, placeholderIndex]);

  return (
    <div className="h-full">
      <div className="z-10 flex flex-col items-center justify-end w-full h-full text-center">
        <h1 className="text-6xl font-bold text-[62px] md:text-[90px]">
          Selfie Records
        </h1>
        <p className="text-[20px] md:text-[26px] mt-6 mb-2 dark:text-gray-400">
          Explore the world of{" "}
          <b className="text-black dark:text-white">DNS TXT records</b> for
          <br className="hidden md:block" />{" "}
          <b className="text-black dark:text-white">payments</b>,{" "}
          <b className="text-black dark:text-white">identities</b> and{" "}
          <b className="text-black dark:text-white">beyond</b>.
        </p>
      </div>

      <div className="z-10 flex flex-col items-center justify-center w-full h-full text-center">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder={placeholder}
            name="name"
            value={name}
            className={`px-12 py-6 mt-6 text-center border-2 w-full text-[20px] sm:text[32px] md:text-[45px] border-gray-300 rounded-full dark:border-neutral-700 dark:bg-neutral-800/30 ${
              error !== null && error?.length > 0
                ? "border-red-500 dark:border-red-500"
                : ""
            }`}
            disabled={searching}
            onChange={(e) => {
              setName(e.target.value);
              setError(null);
            }}
          />
          <div className="flex justify-center gap-4 flex-wrap max-w-[700px] m-auto">
            <AddCustomTXT disabled={searching} />
            <Button
              type="submit"
              variant="default"
              className="w-full md:max-w-[250px] rounded-full md:mt-8 py-8 text-lg font-semibold"
              disabled={searching}
            >
              {searching ? (
                <span className="flex items-center justify-center">
                  <LoaderIcon className="mr-2 animate-spin" />
                  Loading...
                </span>
              ) : (
                <>
                  <Telescope className="h-6 w-6 mr-2" />
                  <span>Discover</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
