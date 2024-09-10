import Head from "next/head";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { CopyBlock, dracula } from "react-code-blocks";

export default function SDKDocs() {
  return (
    <>
      <Head>
        <title>Selfie Records | SDK</title>
        <meta
          name="description"
          content="Facilitating interaction with DNS TXT records for various applications."
        />
      </Head>
      <section className="flex flex-col items-center w-full px-6 md:px-12 space-y-8">
        <div className="text-center">
          <h1 className="text-8xl font-bold leading-tight">SDK</h1>
          <p className="mt-4 text-[22px] md:text-[28px] text-gray-500">
            Utilizing DNS TXT records for a variety of applications.
          </p>
        </div>
        <div className="w-full px-0 max-w-4xl">
          <div className="mb-4">
            <Breadcrumbs
              items={[{ name: "Home", path: "/" }, { name: "SDK" }]}
            />
          </div>
          <p>
            <strong>Selfie Records SDK</strong> is designed to interact with DNS
            TXT records, extending the concept of Bitcoin Improvement Proposal
            (BIP) 353 to support a broader spectrum of data types using standard
            DNS infrastructure.
          </p>

          <h2 className="mt-8 mb-2 text-3xl font-semibold">🌐 Overview</h2>
          <p>
            Selfie Records utilizes DNS TXT records for storing and retrieving
            arbitrary data, enhancing security and privacy through DNSSEC.
          </p>

          <h2 className="mt-8 mb-2 text-3xl font-semibold">✨ Features</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Supports extended data types through DNS TXT records.</li>
            <li>
              Robust SDK simplifies developers interaction with DNS TXT records.
            </li>
            <li>
              Enhanced security with DNSSEC ensures data integrity and
              authenticity.
            </li>
            <li>
              User-friendly access and verification of data directly via DNS.
            </li>
          </ul>

          <h2 className="mt-8 mb-2 text-3xl font-semibold">🚀 Installation</h2>
          <p>
            Install the SDK package using npm to get started with Selfie
            Records.
          </p>
          <CopyBlock
            theme={dracula}
            text={`npm i @synonymdev/selfie-records`}
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
          <h2 className="mt-8 mb-2 text-3xl font-semibold">⚙️ Usage</h2>
          <p>
            Utilize the SDK to interact with DNS TXT records for various
            applications.
          </p>
          <CopyBlock
            theme={dracula}
            text={`import { getRecords } from "@synonymdev/selfie-records";
      
async function fetchRecords() {
  const records = await getRecords({
    name: "hello@miguelmedeiros.dev",
    filters: ["bitcoin-payment", "nostr"], // optional
    dnsServer: "1.1.1.1", // optional
  });

  console.log(records);
}

fetchRecords();`}
            wrapLongLines={true}
            language={"javascript"}
            showLineNumbers={true}
            customStyle={{
              padding: "0px 10px 0px 20px",
              marginBottom: "20px",
              marginTop: "10px",
              borderRadius: "10px",
              overflow: "auto",
            }}
          />

          <h2 className="mt-8 mb-2 text-3xl font-semibold">🤝 Contributing</h2>
          <p>
            Contributions are encouraged! Submit pull requests or file issues
            for enhancements.{" "}
            <a
              className="text-blue-400 underline"
              href="https://github.com/synonymdev/selfie-records"
            >
              GitHub Repo.
            </a>
          </p>

          <h2 className="mt-8 mb-2 text-3xl font-semibold break-words">
            🙏 Acknowledgements
          </h2>
          <p>
            Special thanks to the creators and contributors of BIP 353, whose
            work inspired and laid the groundwork for Selfie Records.
          </p>

          <h2 className="mt-8 mb-2 text-3xl font-semibold">📄 License</h2>
          <p>
            Released under the{" "}
            <a
              className="text-blue-400 underline"
              href="https://github.com/synonymdev/selfie-records/LICENSE"
            >
              MIT License
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
