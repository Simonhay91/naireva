"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { initialConsultationState, type ConsultationFormState } from "./types";
import { StepContact } from "./steps/StepContact";
import { StepGoals } from "./steps/StepGoals";
import { StepPhotos } from "./steps/StepPhotos";
import { StepConfirm } from "./steps/StepConfirm";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function ConsultationForm({ procedures, dict }: { procedures: { slug: string; title: string }[]; dict: Dictionary }) {
  const t = dict.consultationPage;
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ConsultationFormState>(initialConsultationState);
  const [photos, setPhotos] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const attribution = useRef<Record<string, string>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    attribution.current = {
      referrer: document.referrer || "",
      landingPage: window.location.href,
      utmSource: params.get("utm_source") || "",
      utmMedium: params.get("utm_medium") || "",
      utmCampaign: params.get("utm_campaign") || "",
      utmTerm: params.get("utm_term") || "",
      utmContent: params.get("utm_content") || "",
      language: navigator.language || "en",
      source: "website"
    };
  }, []);

  function set<K extends keyof ConsultationFormState>(key: K, value: ConsultationFormState[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function validateStep(): string | null {
    if (step === 0) {
      if (!data.fullName.trim() || !data.country.trim() || !data.email.trim()) {
        return t.step1.validationError;
      }
      if (!/^\S+@\S+\.\S+$/.test(data.email)) return t.step1.emailError;
    }
    if (step === 1 && data.goals.trim().length < 10) {
      return t.step2.validationError;
    }
    return null;
  }

  function next() {
    const err = validateStep();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setStep((s) => Math.min(s + 1, t.steps.length - 1));
  }

  function back() {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  }

  async function submit() {
    if (!data.consentAccepted) {
      setError(t.step4.consentError);
      return;
    }
    setStatus("submitting");
    setError(null);

    const fd = new FormData();
    Object.entries({ ...data, ...attribution.current }).forEach(([key, value]) => {
      fd.append(key, String(value));
    });
    photos.forEach((file) => fd.append("photos", file));

    try {
      const res = await fetch("/api/consultation", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setError(json.error || t.genericError);
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setError(t.genericError);
    }
  }

  const procedureTitle = procedures.find((p) => p.slug === data.procedureSlug)?.title ?? t.step2.procedureNotSure;

  if (status === "success") {
    const contactLabel = t.step1.contactOptions[data.preferredContact];
    return (
      <div className="rounded-3xl border border-line bg-paper p-10 text-center sm:p-14">
        <p className="kicker justify-center">{t.successKicker}</p>
        <h2 className="font-serif text-3xl">{t.successTitleTemplate.replace("{name}", data.fullName.split(" ")[0])}</h2>
        <p className="mt-4 text-muted">{t.successBodyTemplate.replace("{channel}", contactLabel)}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-10 flex items-center gap-3">
        {t.steps.map((label, i) => (
          <div key={label} className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold",
                i === step ? "border-wine bg-wine text-white" : i < step ? "border-wine text-wine" : "border-line text-muted"
              )}
            >
              {i + 1}
            </div>
            <span className={cn("hidden text-xs sm:inline", i === step ? "text-ink" : "text-muted")}>{label}</span>
            {i < t.steps.length - 1 && <div className="h-px w-6 bg-line sm:w-10" />}
          </div>
        ))}
      </div>

      {step === 0 && <StepContact data={data} onChange={set} dict={dict} />}
      {step === 1 && <StepGoals data={data} onChange={set} procedures={procedures} dict={dict} />}
      {step === 2 && <StepPhotos data={data} onChange={set} photos={photos} setPhotos={setPhotos} dict={dict} />}
      {step === 3 && <StepConfirm data={data} onChange={set} procedureTitle={procedureTitle} dict={dict} />}

      {error && <p className="mt-6 text-sm text-wine">{error}</p>}

      <div className="mt-10 flex items-center justify-between">
        {step > 0 ? (
          <button type="button" onClick={back} className="btn-outline">
            {t.back}
          </button>
        ) : (
          <span />
        )}
        {step < t.steps.length - 1 ? (
          <button type="button" onClick={next} className="btn-wine">
            {t.continue}
          </button>
        ) : (
          <button type="button" onClick={submit} disabled={status === "submitting"} className="btn-wine disabled:opacity-60">
            {status === "submitting" ? t.submitting : t.submit}
          </button>
        )}
      </div>
    </div>
  );
}
