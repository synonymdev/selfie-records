# Selfie Records SDK

**Selfie Records** is a robust SDK designed to facilitate interaction with DNS TXT records for a variety of applications, from Bitcoin payment instructions to identity verification and beyond. Building upon the foundations of Bitcoin Improvement Proposal (BIP) 353, Selfie Records extends these concepts to support a broader spectrum of data types using standard DNS infrastructure.

## 🌐 Overview

Selfie Records harnesses DNS TXT records for storing and retrieving arbitrary data, ensuring both human-readability and cryptographic verifiability. This innovative protocol supports diverse data types and enhances security and privacy through DNSSEC.

## ✨ Features

- **Extended Data Types:** Supports various data types through DNS TXT records, not limited to Bitcoin payment instructions.
- **Robust SDK:** Simplifies the interaction with DNS TXT records for developers.
- **Enhanced Security:** Utilizes DNSSEC to ensure data integrity and authenticity.
- **User-friendly:** Provides an easy method for data access and verification directly via DNS.

## 🚀 Installation

Install the Selfie Records SDK to start integrating this functionality into your applications:

```bash
npm i selfie-records
```

## ⚙️ Usage

Here's a quick example on how to retrieve records using the SDK:

```javascript
import { getRecords } from "selfie-records";

async function fetchRecords() {
  const records = await getRecords({
    name: "hello@miguelmedeiros.dev",
    filters: ["bitcoin-payment", "nostr-key"], //optional
    dnsServer: "1.1.1.1", //optional
  });

  console.log(records);
}

fetchRecords();
```

## 📝 Specification

Selfie Records are based on the following format:

```plaintext
identity.user._selfie-record.domain.com
```

Each TXT record adheres to DNS standards and is formatted as a URI-like string for universal compatibility and ease of parsing.

### Security

- All records are secured with DNSSEC, verifying their integrity from the DNS root to the individual record.
- Clients are required to validate DNSSEC signatures completely; records not meeting the security threshold are deemed invalid.

## 🤝 Contributing

Contributions are highly encouraged! Please feel free to submit pull requests, or file issues for bugs, features, or enhancements.

## 📘 Documentation

For more detailed information on integration and API usage, refer to the Selfie Records SDK documentation.

## 🙏 Acknowledgements

Special thanks to the creators and contributors of BIP 353, whose work inspired and laid the groundwork for Selfie Records.

## 📄 License

Selfie Records is open-sourced under the MIT License.
