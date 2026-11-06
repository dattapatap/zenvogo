"use server";

import type { EnquiryType } from "./enquiry";

export type ContactState = {
  ok: boolean;
  message: string;
  errors?: Partial<Record<"name" | "email" | "phone", string>>;
};

export async function sendEnquiry(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const get = (k: string, max = 200) =>
    String(formData.get(k) ?? "")
      .trim()
      .slice(0, max);
  const data = {
    name: get("name"),
    organisation: get("organisation"),
    email: get("email"),
    phone: get("phone"),
    type: get("type") as EnquiryType,
    message: get("message", 4000),
    /** Programme / destination the enquiry is about (set by catalogue pages). */
    interest: get("interest"),
    /** Free-text role from catalogue enquiry forms ("Working professional", "University"…). */
    role: get("role"),
  };

  const errors: ContactState["errors"] = {};
  if (!data.name) errors.name = "Please tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Please enter a valid email.";
  if (data.phone && data.phone.replace(/\D/g, "").length < 7) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (Object.keys(errors).length) {
    return { ok: false, message: "Please check the highlighted fields.", errors };
  }

  // TODO: deliver the enquiry — e.g. send an email (Resend, SES) or push to a CRM.
  // Until then submissions are only validated, not stored or sent anywhere.

  return {
    ok: true,
    message: `Thank you, ${data.name}. Our team will be in touch within one business day.`,
  };
}
