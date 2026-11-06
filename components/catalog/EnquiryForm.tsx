"use client";

import { motion } from "motion/react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useActionState, useId } from "react";
import { sendEnquiry, type ContactState } from "@/app/contact/actions";
import { cn } from "@/lib/utils";

const initial: ContactState = { ok: false, message: "" };

const inputCls =
  "h-11 w-full rounded-lg border border-border bg-white px-3.5 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-blue focus:ring-3 focus:ring-blue/15";

type Props = {
  /** What the enquiry is about — sent with the form. */
  interest: string;
  title?: string;
  subtitle?: string;
  roles: string[];
  /** Show an "Organisation / institution" field. */
  organisation?: boolean;
  button?: string;
  className?: string;
};

/** Compact lead form used on programme, certification and immersion pages. */
export function EnquiryForm({
  interest,
  title = "Register your interest",
  subtitle = "Be the first to hear when enrolment opens.",
  roles,
  organisation,
  button = "Register Interest",
  className,
}: Props) {
  const [state, action, pending] = useActionState(sendEnquiry, initial);
  const roleId = useId();

  if (state.ok) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "flex flex-col items-center gap-3 rounded-2xl bg-white p-8 text-center shadow-[0_30px_60px_-30px_rgb(8_29_72/0.5)]",
          className,
        )}
        role="status"
      >
        <CheckCircle2 className="size-12 text-orange" />
        <p className="text-xl font-bold text-navy">You&apos;re on the list</p>
        <p className="text-sm text-muted-foreground">{state.message}</p>
      </motion.div>
    );
  }

  return (
    <form
      action={action}
      noValidate
      className={cn(
        "flex flex-col gap-4 rounded-2xl bg-white p-6 text-foreground shadow-[0_30px_60px_-30px_rgb(8_29_72/0.5)] sm:p-7",
        className,
      )}
    >
      <div>
        <p className="text-xl font-bold text-navy">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <input type="hidden" name="interest" value={interest} />
      <input type="hidden" name="type" value="other" />

      <Field name="name" placeholder="Full name *" autoComplete="name" error={state.errors?.name} />
      <Field
        name="email"
        type="email"
        placeholder="Email *"
        autoComplete="email"
        error={state.errors?.email}
      />
      <Field
        name="phone"
        type="tel"
        placeholder="Phone"
        autoComplete="tel"
        error={state.errors?.phone}
      />
      {organisation && (
        <Field
          name="organisation"
          placeholder="Organisation / institution"
          autoComplete="organization"
        />
      )}
      <label className="sr-only" htmlFor={roleId}>
        I am
      </label>
      <select id={roleId} name="role" defaultValue="" className={inputCls}>
        <option value="" disabled>
          I am…
        </option>
        {roles.map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>

      {state.message && !state.ok && (
        <p className="text-sm font-medium text-orange" role="alert">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-orange px-6 font-semibold text-white shadow-[0_8px_24px_-8px_rgb(255_104_24/0.6)] transition-all hover:-translate-y-0.5 hover:bg-[#ec5a0c] disabled:opacity-60"
      >
        {pending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4 transition-transform group-hover:translate-x-1" />
        )}
        {pending ? "Sending…" : button}
      </button>
      <p className="text-center text-xs text-muted-foreground">
        Your details are used only to respond to your enquiry.
      </p>
    </form>
  );
}

function Field({
  error,
  ...props
}: React.ComponentProps<"input"> & { name: string; error?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <input
        {...props}
        aria-label={props.placeholder?.replace(" *", "")}
        aria-invalid={!!error}
        className={cn(inputCls, error && "border-orange")}
      />
      {error && <span className="text-xs font-medium text-orange">{error}</span>}
    </div>
  );
}
