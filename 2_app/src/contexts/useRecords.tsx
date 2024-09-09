"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

type RecordContextType = {
  records: string[];
  addRecord: (record: string) => void;
  removeRecord: (record: string) => void;
  clearRecords: () => void;
  resetRecords: () => void;
  dnsServer: string;
  setDnsServer: (server: string) => void;
  step: number;
  setStep: (value: number) => void;
};

const RecordsContext = createContext<RecordContextType>({
  records: [] as string[],
  addRecord: (record: string) => {},
  removeRecord: (record: string) => {},
  clearRecords: () => {},
  resetRecords: () => {},
  dnsServer: "1.1.1.1", // Default value for DNS server
  setDnsServer: (server: string) => {},
  step: 0,
  setStep: (value: number) => {},
});

const initialRecords = ["bitcoin-payment", "pubky-key", "nostr-key", "pgp-key"];

export function RecordsProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [records, setRecords] = useState(initialRecords);
  const [dnsServer, setDnsServer] = useState("1.1.1.1"); // Default to Cloudflare
  const [step, setStep] = useState(0);

  const addRecord = (newRecord: string) => {
    if (!records.includes(newRecord)) {
      setRecords([...records, newRecord]);
    }
  };

  const removeRecord = (recordToRemove: string) => {
    setRecords(records.filter((record) => record !== recordToRemove));
  };

  const clearRecords = () => {
    setRecords([]);
  };

  const resetRecords = () => {
    setDnsServer("1.1.1.1");
    setRecords(initialRecords);
  };

  useEffect(() => {
    if (router.query?.filters && typeof router.query.filters === "string") {
      const filters = router.query.filters;
      setRecords(filters.split(","));
    }
  }, [router.query.filters]);

  return (
    <RecordsContext.Provider
      value={{
        records,
        addRecord,
        removeRecord,
        clearRecords,
        resetRecords,
        dnsServer,
        setDnsServer,
        step,
        setStep,
      }}
    >
      {children}
    </RecordsContext.Provider>
  );
}

export const useRecordsContext = () => useContext(RecordsContext);
