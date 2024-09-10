# Selfie Records SDK

**Selfie Records SDK** is designed to interact with DNS TXT records, extending the concept of Bitcoin Improvement Proposal (BIP) 353 to support a broader spectrum of data types using standard DNS infrastructure.

## 🌐 Overview

Selfie Records utilizes DNS TXT records for storing and retrieving arbitrary data, enhancing security and privacy through DNSSEC.

## ✨ Features

- Supports extended data types through DNS TXT records.
- Robust SDK simplifies developers interaction with DNS TXT records.
- Enhanced security with DNSSEC ensures data integrity and authenticity.
- User-friendly access and verification of data directly via DNS.

## 🚀 Installation

Install the SDK package using npm to get started with Selfie Records.

```bash
npm i @synonymdev/selfie-records
```

## ⚙️ Usage

Utilize the SDK to interact with DNS TXT records for various applications.

```javascript
import { getRecords } from "@synonymdev/selfie-records";

async function fetchRecords() {
  const records = await getRecords({
    name: "hello@miguelmedeiros.dev",
    filters: ["bitcoin-payment", "nostr-key"], // optional
    dnsServer: "1.1.1.1", // optional
  });

  console.log(records);
}

fetchRecords();
```

## 🤝 Contributing

Contributions are encouraged! Submit pull requests or file issues for enhancements. [GitHub Repo](https://github.com/pubky/selfie-records).

## 🙏 Acknowledgements

Special thanks to the creators and contributors of BIP 353, whose work inspired and laid the groundwork for Selfie Records.

## 📄 License

Selfie Records is open-sourced under the [MIT License](./LICENSE).
