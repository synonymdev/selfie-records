"use client";

import { createContext, useState, useContext } from "react";

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
  setRecords: (records: string[]) => void;
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
  setRecords: (records: string[]) => {},
});

const initialRecords = ["bitcoin-payment", "nostr", "pgp", "node-uri"];

export function RecordsProvider({ children }: { children: React.ReactNode }) {
  const [records, setRecords] = useState(initialRecords as string[]);
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
        setRecords,
      }}
    >
      {children}
    </RecordsContext.Provider>
  );
}

export const useRecordsContext = () => useContext(RecordsContext);
