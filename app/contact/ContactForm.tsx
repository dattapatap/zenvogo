"use client";

import { motion } from "motion/react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { cn } from "@/lib/utils";
import { sendEnquiry, type ContactState } from "./actions";
import { enquiryTypes, isEnquiryType } from "./enquiry";

const initial: ContactState = { ok: false, message: "" };

const inputCls =
  "h-12 rounded-lg border border-[#c4d3e5] bg-white px-4 text-foreground outline-none transition-all placeholder:text-muted-foreground/70 hover:border-blue/50 focus:border-blue focus:ring-3 focus:ring-blue/15";

export function ContactForm() {
  const params = useSearchParams();
  const type = params.get("type");
  const [state, action, pending] = useActionState(sendEnquiry, initial);

  if (state.ok) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4 rounded-2xl border border-[#c4d3e5] bg-white p-12 text-center shadow-[0_16px_40px_-12px_rgb(8_29_72/0.08)]"
        role="status"
      >
        <CheckCircle2 className="size-14 text-orange" />
        <h2 className="text-[26px] font-bold">Message sent</h2>
        <p className="text-muted-foreground">{state.message}</p>
      </motion.div>
    );
  }

  return (
    <FormFields
      action={action}
      pending={pending}
      state={state}
      defaultType={isEnquiryType(type) ? type : "industry"}
    />
  );
}

/** Static fallback rendered while search params are resolved. */
export function ContactFormFallback() {
  return <FormFields action={() => {}} pending={false} state={initial} defaultType="industry" />;
}

function FormFields({
  action,
  pending,
  state,
  defaultType,
}: {
  action: (formData: FormData) => void;
  pending: boolean;
  state: ContactState;
  defaultType: string;
}) {
  return (
    <form
      action={action}
      className="flex flex-col gap-5 rounded-2xl border border-[#c4d3e5] bg-white p-6 shadow-[0_16px_40px_-12px_rgb(8_29_72/0.08)] sm:p-10"
      noValidate
    >
      <div>
        <h2 className="text-[26px] font-bold">Send us a message</h2>
        <p className="mt-1 text-sm text-muted-foreground">We reply within one business day.</p>
      </div>

      <label className="flex flex-col gap-2 text-sm font-semibold text-navy">
        I&apos;m reaching out as
        <select key={defaultType} name="type" defaultValue={defaultType} className={inputCls}>
          {Object.entries(enquiryTypes).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Full name"
          name="name"
          autoComplete="name"
          required
          error={state.errors?.name}
        />
        <Field label="Organisation" name="organisation" autoComplete="organization" />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          error={state.errors?.email}
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          error={state.errors?.phone}
        />
      </div>

      <label className="flex flex-col gap-2 text-sm font-semibold text-navy">
        How can we help?
        <textarea
          name="message"
          rows={5}
          maxLength={4000}
          placeholder="Tell us about your industry, your learning needs or your venture…"
          className={cn(inputCls, "h-auto resize-y py-3 font-normal")}
        />
      </label>

      {state.message && !state.ok && (
        <p className="text-sm font-medium text-orange" role="alert">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-orange px-6 font-semibold text-white shadow-[0_8px_24px_-8px_rgb(255_104_24/0.6)] transition-all hover:-translate-y-0.5 hover:bg-[#ec5a0c] disabled:opacity-60 sm:w-fit"
      >
        {pending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4 transition-transform group-hover:translate-x-1" />
        )}
        {pending ? "Sending…" : "Send Message"}
      </button>
      <p className="text-xs text-muted-foreground">
        Your details are used only to respond to your enquiry.
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  ...props
}: React.ComponentProps<"input"> & { label: string; name: string; error?: string }) {
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold text-navy">
      <span>
        {label}
        {props.required && <span className="text-orange"> *</span>}
      </span>
      <input
        {...props}
        aria-invalid={!!error}
        className={cn(inputCls, "font-normal", error && "border-orange")}
      />
      {error && <span className="text-xs font-medium text-orange">{error}</span>}
    </label>
  );
}
