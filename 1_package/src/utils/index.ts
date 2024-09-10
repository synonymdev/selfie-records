import { InputObject, Result, TransformedObject } from "../types";

export const defaultRecords = ["bitcoin-payment", "pgp", "nostr", "node-uri"];

export function normalizeResult(input: InputObject): TransformedObject {
  const transformedRecords: TransformedObject = {};

  input.records.forEach((record) => {
    if (!record) return;
    transformedRecords[record.key] = {
      value: record.value,
      error: record.error,
    };
  });

  return transformedRecords;
}

export function getTXTRecordKey({ name, key }: { name: string; key: string }) {
  // check if the name includes an '@' symbol
  if (name.includes("@")) {
    const [localPart, domain] = name.split("@");
    return `${localPart}.user._${key}.${domain}`;
  }

  return `_${key}.${name}`;
}

export async function validateEmailAddress({
  key,
  name,
}: {
  key: string;
  name: string;
}): Promise<Result> {
  if (typeof name !== "string") {
    return {
      key,
      value: "",
      error: "Invalid name type",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(name)) {
    return {
      key,
      value: "",
      error: "Invalid email name",
    };
  }

  return {
    key,
    value: "",
    error: null,
  };
}

export function validateDomainOrSubdomain({
  key,
  name,
}: {
  key: string;
  name: string;
}): Result {
  if (typeof name !== "string") {
    return {
      key,
      value: "",
      error: "Invalid name type",
    };
  }

  const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+(\.[a-zA-Z0-9-_]+)+.*)$/;

  if (!domainRegex.test(name)) {
    return {
      key,
      value: "",
      error: "Invalid domain or subdomain name",
    };
  }

  return {
    key,
    value: "",
    error: null,
  };
}

export function handleError({
  key,
  error,
}: {
  key: string;
  error: { code: string };
}): Result {
  if (error.code === "ENODATA") {
    return {
      key,
      value: "",
      error: "No TXT records found",
    };
  } else if (error.code === "ENOTFOUND") {
    return {
      key,
      value: "",
      error: "Domain not found",
    };
  }
  return {
    key,
    value: "",
    error: "Failed to get TXT records",
  };
}
