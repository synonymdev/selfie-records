import { getRecords } from "@synonymdev/selfie-records";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { name, filters, dnsServer } = req.query as {
      name: string;
      filters: string;
      dnsServer: string;
    };

    if (!name) {
      return res.status(400).json({ error: "'name' param is required" });
    }

    const filterArray = filters ? filters.split(",") : [];

    const records = await getRecords({
      name: name,
      filters: filterArray.length ? filterArray : undefined,
      dnsServer: dnsServer ? dnsServer : undefined,
    });

    res.status(200).json({ records });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch records" });
  }
}
