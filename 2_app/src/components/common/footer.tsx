import { useRouter } from "next/router";

const footerItems = [
  {
    title: "Spec",
    description:
      "Understand how Selfie Records works, its features and the theory behind it.",
    path: "spec",
  },
  {
    title: "Tutorials",
    description:
      "Learn how to setup your environment to use Selfie Records in your domains.",
    path: "tutorials",
  },
  {
    title: "SDK",
    description:
      "Use our JS SDK to interact with your DNS and build your own cool projects.",
    path: "sdk",
  },
  {
    title: "Contribute",
    description:
      "Help us improve our spec, SDK and tools around Selfie Records.",
    href: "https://github.com/pubky/selfie-records",
    external: true,
  },
];

export const Footer = () => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-left gap-3 mb-6 mt-24">
      {footerItems.map((item, index) => {
        const isExternal = item.external ?? false;
        return (
          <a
            key={index}
            onClick={() => !isExternal && item.path && router.push(item.path)}
            href={isExternal ? item.href : undefined}
            target={isExternal ? "_blank" : undefined}
            className="cursor-pointer group rounded-lg border px-6 py-6 transition-colors hover:border-gray-300 hover:bg-gray-100 dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:bg-gray-200 lg:dark:bg-zinc-800/30"
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              {item.title}{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              {item.description}
            </p>
          </a>
        );
      })}
    </div>
  );
};
