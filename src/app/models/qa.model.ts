export interface QA {
  question?: string;
  createDt?: any;
  answer?: any;
  formattedAnswer?: string;
}
export interface QAId extends QA {
  id: string;
}
