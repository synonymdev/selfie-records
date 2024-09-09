export type RecordItem = {
  key: string;
  value: string;
  error: string | null;
};

export type InputObject = {
  records: RecordItem[];
};

export type TransformedObject = {
  [key: string]: {
    value: string;
    error: string | null;
  };
};

export type Result = {
  key: string;
  value: string | any;
  error: string | null;
};

export type PropsTxtRecord = {
  txtRecords: any;
  handleError: (error: any) => Result;
};

export interface DNSQuestion {
  name: string;
  type: string;
  class: string;
}

export interface DNSAnswer {
  name: string;
  type: string;
  ttl: number;
  class: string;
  flush: boolean;
  data: string[];
}

export interface DNSResponse {
  id: number;
  type: string;
  flags: number;
  flag_qr: boolean;
  opcode: string;
  flag_aa: boolean;
  flag_tc: boolean;
  flag_rd: boolean;
  flag_ra: boolean;
  flag_z: boolean;
  flag_ad: boolean;
  flag_cd: boolean;
  rcode: string;
  questions: DNSQuestion[];
  answers: DNSAnswer[];
  authorities: any[];
  additionals: any[];
}
