import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const siteName = "Selfie Records";
  const description =
    "an extension to the Bitcoin Improvement Proposal (BIP) 353, expanding the concept of DNS-based resolution of payment instructions to a broader application of identity and data verification through DNS TXT records.";
  return (
    <Html lang="en">
      <Head>
        <script
          defer
          data-domain="selfie-records.com"
          src="https://_analytics.synonym.to/js/script.tagged-events.js"
        ></script>

        <link rel="icon" href="map-pin-check-inside.svg" />

        <meta name="description" content={description} />
        <meta key="og_type" property="og:type" content={"website"} />
        <meta key="og_title" property="og:title" content={siteName} />
        <meta
          key="og_description"
          property="og:description"
          content={description}
        />
        <meta key="og_locale" property="og:locale" content="en_IE" />
        <meta key="og_site_name" property="og:site_name" content={siteName} />
        <meta
          key="og_url"
          property="og:url"
          content={"https://selfie-records.com"}
        />
        <meta key="og_site_name" property="og:site_name" content={siteName} />
        <meta
          key="og_image"
          property="og:image"
          content={"https://selfie-records.com/selfie-records.png"}
        />
        <meta key="og_image:alt" property="og:image:alt" content={siteName} />
        <meta key="og_image:width" property="og:image:width" content="1200" />
        <meta key="og_image:height" property="og:image:height" content="630" />

        <meta name="robots" content="index,follow" />

        <link rel="canonical" href={"https://selfie-records.com"} />

        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body className="min-w-[400px] w-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
