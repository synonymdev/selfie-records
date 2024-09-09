const dnsSocket = require("dns-socket");
import {
  defaultRecords,
  getTXTRecordKey,
  handleError,
  normalizeResult,
  validateEmailAddress,
  validateDomainOrSubdomain,
} from "./utils";
import { DNSAnswer, DNSResponse, RecordItem } from "./types";

const resolveTxtWithDNSSEC = async ({
  name,
  dnsServer,
}: {
  name: string;
  dnsServer: string;
}): Promise<DNSAnswer[]> => {
  const socket = new dnsSocket();

  return new Promise((resolve, reject) => {
    socket.query(
      {
        questions: [{ type: "TXT", name: name }],
        additionals: [
          {
            type: "OPT",
            name: ".",
            udpPayloadSize: 4096,
            flags: 32768,
          },
        ],
      },
      53,
      dnsServer,
      (err: any, res: DNSResponse) => {
        if (err) return reject(err);

        const hasDNSSEC = res && res.flag_ad;

        if (!hasDNSSEC) {
          return reject(new Error("DNSSEC validation failed"));
        }

        resolve(res.answers);
      }
    );
  });
};

const processDnsRecord = (record: DNSAnswer) => {
  if (record.type === "TXT") {
    return record.data.map((buf: string) => buf.toString()).join(" ");
  } else if (record.type === "RRSIG") {
    return JSON.stringify(record.data);
  } else {
    return "Unsupported record type";
  }
};

export const getRecords = async ({
  name,
  filters = defaultRecords,
  dnsServer = "8.8.8.8",
}: {
  name: string;
  filters?: string[];
  dnsServer?: string;
}) => {
  const promises = filters.map(async (key) => {
    try {
      if (filters.includes(key)) {
        const checkDomain = validateDomainOrSubdomain({ key, name });
        const checkEmail = await validateEmailAddress({ key, name });

        if (checkDomain.error && checkEmail.error) {
          return {
            key,
            value: "",
            error: checkDomain.error || checkEmail.error,
          };
        }

        const domainName = getTXTRecordKey({ name, key });

        const txtRecords: DNSAnswer[] = await resolveTxtWithDNSSEC({
          name: domainName,
          dnsServer,
        });

        if (txtRecords.length === 0) {
          return { key, value: "", error: "No TXT records found" };
        }

        const value = txtRecords.map(processDnsRecord)[0];

        return { key, value, error: null };
      }
    } catch (error: any) {
      return handleError({ key, error });
    }
  });

  const recordsResults = await Promise.all(promises);

  const records = recordsResults.filter(
    (result): result is RecordItem => result !== undefined
  );

  return normalizeResult({ records });
};

export default {
  getRecords,
};
