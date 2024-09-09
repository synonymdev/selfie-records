// src/@types/dns-socket.d.ts
declare module "dns-socket" {
  interface DnsSocketOptions {
    timeout?: number;
    tries?: number;
    type?: string;
  }

  interface DnsSocketQuery {
    questions: Question[];
    additionals?: any[];
  }

  interface Question {
    name: string;
    type: string;
  }

  interface Answer {
    name: string;
    type: number;
    class: number;
    ttl: number;
    flush: boolean;
    data: any;
  }

  interface DnsSocketResponse {
    answers: Answer[];
    ad?: boolean; // Indica DNSSEC authenticated data
  }

  type Callback = (error: Error | null, response: DnsSocketResponse) => void;

  class DnsSocket {
    constructor(options?: DnsSocketOptions);
    query(
      query: DnsSocketQuery,
      port: number,
      host: string,
      callback: Callback
    ): void;
    destroy(): void;
  }

  export = DnsSocket;
}

declare module "dns-socket" {
  const any: any;
  export default any;
}
