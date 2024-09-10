import Head from "next/head";
import Image from "next/image";

import { CopyBlock, dracula } from "react-code-blocks";

import { Breadcrumbs } from "@/components/breadcrumbs";

export default function Docs() {
  const code = `; <<>> DiG 9.18.24-0ubuntu0.22.04.1-Ubuntu <<>> @1.1.1.1 txt hello.user._pubky-key.miguelmedeiros.dev
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 56001
;; flags: qr rd ra ad; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
;; QUESTION SECTION:
;hello.user._pubky-key.miguelmedeiros.dev. IN TXT

;; ANSWER SECTION:
hello.user._pubky-key.miguelmedeiros.dev. 60 IN TXT "pk:o1gg96ewuojmopcjbz8895478wdtxtzzuxnfjjz8o8e77csa1ngo"

;; Query time: 60 msec
;; SERVER: 1.1.1.1#53(1.1.1.1) (UDP)
;; WHEN: Sat Jul 27 21:25:58 -03 2024
;; MSG SIZE  rcvd: 137`;

  const recordFormats = `# identity.user._key.domain.com
# hello@miguelmedeiros.dev
hello.user._bitcoin-payment.miguelmedeiros.dev 

# _key.domain.com
# miguelmedeiros.dev
_bitcoin-payment.miguelmedeiros.dev

# _key.sub.domain.com
# pay.miguelmedeiros.dev
_bitcoin-payment.pay.miguelmedeiros.dev`;

  return (
    <>
      <Head>
        <title>Selfie Records</title>
        <meta
          name="description"
          content="Expanding DNS-based data verification beyond Bitcoin payment instructions."
        />
      </Head>
      <section className="flex flex-col items-center w-full lg:px-24 space-y-8">
        <div className="text-center">
          <h1 className="text-8xl font-bold leading-tight">Spec</h1>
          <p className="mt-4 text-[22px] md:text-[28px] text-gray-500">
            Expanding DNS-based data verification
            <br />
            beyond Bitcoin payment.
          </p>
        </div>
        <div className="w-full px-0 max-w-4xl">
          <div className="mb-4 w-full">
            <Breadcrumbs
              items={[{ name: "Home", path: "/" }, { name: "Spec" }]}
            />
          </div>
          <p>
            <strong>Selfie Records</strong> is an extension to the Bitcoin
            Improvement Proposal (BIP) 353, expanding the concept of DNS-based
            resolution of payment instructions to a broader application of
            identity and data verification through DNS TXT records.
          </p>

          <h2 className="mt-8 mb-2 text-3xl font-semibold">🌐 Overview</h2>
          <p>
            Selfie Records utilizes DNS TXT records for storing and retrieving
            arbitrary data in a manner that is both human-readable and
            verifiable. This protocol extends the original concept of BIP 353 to
            encompass a wider range of data types beyond Bitcoin payment
            instructions. With Selfie Records, users can manage and resolve
            identities, configurations, and other data types using standard DNS
            infrastructure, securely and privately.
          </p>

          <h3 className="mt-8 mb-2 text-3xl font-semibold">
            Why expand BIP353 to support more than just Bitcoin payments?
          </h3>
          <p>
            Initially, BIP353 focused solely on payments through DNS TXT
            records. However, the infrastructure of DNS is versatile and secure,
            especially when combined with DNSSEC. This project, Selfie Records,
            aims to expand the utility of BIP353 to support a variety of use
            cases through TXT records, including:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Identities:</strong> Verifying and associating public keys
              (e.g., Nostr, Bitcoin) with email addresses or domain names.
            </li>
            <li>
              <strong>Payments:</strong> Continuing to support Bitcoin payments
              using DNS-based resolutions.
            </li>
            <li>
              <strong>Other data types:</strong> DNS TXT records can store
              anything from authentication keys to metadata, making it a
              flexible and decentralized alternative to more traditional data
              storage methods.
            </li>
          </ul>
          <p>
            By leveraging the existing DNS infrastructure, we offer a
            decentralized, secure, and simple solution for handling multiple
            types of data.
          </p>
          <div className="w-full flex justify-center my-8">
            <img src="/dns.png" alt="DNS use cases" width={453} height={453} />
          </div>

          <h2 className="mt-8 mb-2 text-3xl font-semibold">✨ Features</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Extendable Data Types:</strong> Beyond Bitcoin payment
              instructions, support various data types through TXT records.
            </li>
            <li>
              <strong>SDK Support:</strong> Includes a robust SDK for easy
              integration and interaction with DNS TXT records.
            </li>
            <li>
              <strong>Privacy and Security:</strong> Leverages DNSSEC to provide
              cryptographic assurances for the data retrieved.
            </li>
            <li>
              <strong>Human-readable Resolution:</strong> Provides a
              user-friendly method to access and verify data directly from DNS.
            </li>
            <li>
              <strong>Supports address, domains and subdomains formats:</strong>{" "}
              Provides a way to store and retrieve data for both address,
              domains and subdomains formats.
            </li>
          </ul>

          <h2 className="mt-8 mb-2 text-3xl font-semibold">🚀 Motivation</h2>
          <p>
            While BIP 353 successfully mapped human-readable names to Bitcoin
            payment instructions, there was a clear demand for extending this
            approach to other types of data. Selfie Records answers this call by
            offering a standardized way to store and retrieve not just payment
            instructions but any data, using the globally recognized and
            decentralized DNS system. This approach maintains user privacy, as
            DNS queries do not directly expose the requester’s IP address and
            DNS queries can be proxied for additional anonymity.
          </p>

          <h2 className="mt-8 mb-2 text-3xl font-semibold">📝 Specification</h2>
          <h3 className="text-2xl font-semibold">Record Format</h3>
          <p>
            Selfie Records are TXT records that follow a specific format for
            storing data. The format is as follows:
          </p>
          <CopyBlock
            theme={dracula}
            text={recordFormats}
            wrapLongLines={true}
            language={"bash"}
            showLineNumbers={false}
            customStyle={{
              padding: "15px 20px",
              marginBottom: "20px",
              marginTop: "10px",
              borderRadius: "10px",
              wordBreak: "break-all",
            }}
          />
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2">Security</h3>
            <p>
              All TXT records must be signed with DNSSEC, ensuring their
              authenticity and integrity from the DNS root down to the specific
              record.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2">Resolution</h3>
            <p>
              Clients must verify DNSSEC signatures fully, and any record not
              signed with an appropriate level of security (e.g., SHA-256 or
              better) is considered invalid.
            </p>
          </div>

          <h2 className="mt-8 mb-2 text-3xl font-semibold">⚙️ Using dig</h2>
          <p>
            Use the <code>dig</code> command to query a TXT record from a
            specific DNS server. The following example retrieves the TXT record
            for the domain <code>hello.user._pubky-key.miguelmedeiros.dev</code>{" "}
            from the Cloudflare DNS server.
          </p>
          <CopyBlock
            theme={dracula}
            text={`dig @1.1.1.1 txt hello.user._pubky-key.miguelmedeiros.dev`}
            wrapLongLines={true}
            language={"bash"}
            showLineNumbers={false}
            customStyle={{
              padding: "15px 20px",
              marginBottom: "20px",
              marginTop: "10px",
              borderRadius: "10px",
              wordBreak: "break-all",
            }}
          />
          <CopyBlock
            theme={dracula}
            text={code}
            wrapLongLines={true}
            language={"bash"}
            showLineNumbers={false}
            customStyle={{
              padding: "15px 20px",
              marginBottom: "20px",
              marginTop: "10px",
              borderRadius: "10px",
              wordBreak: "break-all",
            }}
          />
          <h2 className="mt-8 mb-2 text-3xl font-semibold">
            📘 SDK Documentation
          </h2>
          <p>
            The{" "}
            <a href="/sdk" className="text-blue-400 underline">
              Selfie Records SDK
            </a>{" "}
            provides a comprehensive guide to integrating and using the protocol
            in your applications. See the SDK documentation for detailed
            examples and API descriptions.
          </p>

          <h2 className="mt-8 mb-2 text-3xl font-semibold">🤝 Contributing</h2>
          <p>
            We welcome contributions from the community. Make an issue or submit
            a pull request to help improve Selfie Records.{" "}
            <a
              className="text-blue-400 underline"
              href="https://github.com/pubky/selfie-records"
            >
              GitHub Repo.
            </a>
          </p>

          <h2 className="mt-8 mb-2 text-3xl font-semibold break-all">
            🙏 Acknowledgements
          </h2>
          <p>
            Thanks to the developers and contributors of BIP 353 for laying the
            groundwork for DNS-based data resolution.
          </p>

          <h2 className="mt-8 mb-2 text-3xl font-semibold">📄 License</h2>
          <p>
            All Selfie Records repositories are released under{" "}
            <a
              className="text-blue-400 underline"
              href="https://github.com/pubky/selfie-records/LICENSE"
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
