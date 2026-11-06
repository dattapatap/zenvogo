export const enquiryTypes = {
  industry: "Industry / enterprise",
  institution: "Academic institution",
  professional: "Senior professional",
  startup: "AI startup",
  other: "Something else",
} as const;

export type EnquiryType = keyof typeof enquiryTypes;

export const isEnquiryType = (v: string | null): v is EnquiryType => !!v && v in enquiryTypes;
