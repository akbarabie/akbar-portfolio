"use client";

import { useState, type SubmitEvent } from "react";
import { useTranslations } from "next-intl";
import { contactFormSchema } from "@/lib/validations/contact";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    setFieldErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      website: formData.get("website"),
    };

    const parsed = contactFormSchema.safeParse(payload);
    if (!parsed.success) {
      const errors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        errors[issue.path[0] as string] = issue.message;
      });
      setFieldErrors(errors);
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to send message.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot — off-screen, bukan display:none (bot yang lebih pintar
          ngecek itu), dan tabIndex={-1} biar gak kena keyboard nav user asli. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
          {t("nameLabel")}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-foreground focus:border-accent focus:outline-none"
        />
        {fieldErrors.name && <p className="mt-1 text-sm text-red-400">{fieldErrors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
          {t("emailLabel")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-foreground focus:border-accent focus:outline-none"
        />
        {fieldErrors.email && <p className="mt-1 text-sm text-red-400">{fieldErrors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
          {t("messageLabel")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-foreground focus:border-accent focus:outline-none"
        />
        {fieldErrors.message && <p className="mt-1 text-sm text-red-400">{fieldErrors.message}</p>}
      </div>

      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? t("sending") : t("submit")}
      </Button>

      {status === "success" && <p className="text-sm text-emerald-400">{t("successMessage")}</p>}
      {status === "error" && errorMsg && <p className="text-sm text-red-400">{errorMsg}</p>}
    </form>
  );
}