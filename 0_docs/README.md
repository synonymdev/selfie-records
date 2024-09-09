# Selfie Records

**Selfie Records** is an extension to the Bitcoin Improvement Proposal (BIP) 353, expanding the concept of DNS-based resolution of payment instructions to a broader application of identity and data verification through DNS TXT records.

## 🌐 Overview

Selfie Records utilizes DNS TXT records for storing and retrieving arbitrary data in a manner that is both human-readable and verifiable. This protocol extends the original concept of BIP 353 to encompass a wider range of data types beyond Bitcoin payment instructions. With Selfie Records, users can manage and resolve identities, configurations, and other data types using standard DNS infrastructure, securely and privately.

## ✨ Features

- **Extendable Data Types:** Beyond Bitcoin payment instructions, support various data types through TXT records.
- **SDK Support:** Includes a robust SDK for easy integration and interaction with DNS TXT records.
- **Privacy and Security:** Leverages DNSSEC to provide cryptographic assurances for the data retrieved.
- **Human-readable Resolution:** Provides a user-friendly method to access and verify data directly from DNS.

## 🚀 Motivation

While BIP 353 successfully mapped human-readable names to Bitcoin payment instructions, there was a clear demand for extending this approach to other types of data. Selfie Records answers this call by offering a standardized way to store and retrieve not just payment instructions but any data, using the globally recognized and decentralized DNS system. This approach maintains user privacy, as DNS queries do not directly expose the requester’s IP address and DNS queries can be proxied for additional anonymity.

## 📝 Specification

### Record Format

Selfie Records are stored at specific DNS labels constructed similarly to those in BIP 353:

```bash
identity.user._selfie-record.domain.com
```

Each record must conform to the DNS TXT record standards, with data formatted as a URI-like string to ensure compatibility and ease of parsing.

### Security

All TXT records must be signed with DNSSEC, ensuring their authenticity and integrity from the DNS root down to the specific record.

### Resolution

Clients must verify DNSSEC signatures fully, and any record not signed with an appropriate level of security (e.g., SHA-256 or better) is considered invalid.

## ⚙️ Installation and Usage

```bash
npm install selfie-records
```

```javascript
import { getRecords } from 'selfie-records';

const records = await getRecords({
  name: 'hello@miguelmedeiros.dev',
  filters: ['bitcoin-payment', 'nostr-key'], // optional
  dnsServer: '1.1.1.1', // optional
});

console.log(records);
```

## 📘 SDK Documentation

The Selfie Records SDK provides a comprehensive guide to integrating and using the protocol in your applications. See the SDK documentation for detailed examples and API descriptions.

## 🤝 Contributing

We welcome contributions from the community. Make an issue or submit a pull request to help improve Selfie Records.

## 🙏 Acknowledgements

Thanks to the developers and contributors of BIP 353 for laying the groundwork for DNS-based data resolution.

## 📄 License

Selfie Records is released under the MIT License.
