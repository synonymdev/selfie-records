import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          defer
          data-domain="selfie-records.com"
          src="https://_analytics.synonym.to/js/script.tagged-events.js"
        ></script>
      </Head>
      <body className="min-w-[400px] w-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
