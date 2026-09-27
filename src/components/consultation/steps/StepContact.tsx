import type { ConsultationFormState } from "@/components/consultation/types";
import { Field, inputClass } from "@/components/consultation/Field";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function StepContact({
  data,
  onChange,
  dict
}: {
  data: ConsultationFormState;
  onChange: <K extends keyof ConsultationFormState>(key: K, value: ConsultationFormState[K]) => void;
  dict: Dictionary;
}) {
  const t = dict.consultationPage.step1;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <Field label={t.fullName} full>
        <input
          required
          className={inputClass}
          value={data.fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
          autoComplete="name"
        />
      </Field>
      <Field label={t.country}>
        <input required className={inputClass} value={data.country} onChange={(e) => onChange("country", e.target.value)} autoComplete="country-name" />
      </Field>
      <Field label={t.city}>
        <input className={inputClass} value={data.city} onChange={(e) => onChange("city", e.target.value)} autoComplete="address-level2" />
      </Field>
      <Field label={t.email}>
        <input required type="email" className={inputClass} value={data.email} onChange={(e) => onChange("email", e.target.value)} autoComplete="email" />
      </Field>
      <Field label={t.age}>
        <input
          type="number"
          min={16}
          max={100}
          className={inputClass}
          value={data.age}
          onChange={(e) => onChange("age", e.target.value)}
        />
      </Field>
      <Field label={t.preferredContact}>
        <select
          required
          className={inputClass}
          value={data.preferredContact}
          onChange={(e) => onChange("preferredContact", e.target.value as ConsultationFormState["preferredContact"])}
        >
          <option value="WHATSAPP">{t.contactOptions.WHATSAPP}</option>
          <option value="TELEGRAM">{t.contactOptions.TELEGRAM}</option>
          <option value="EMAIL">{t.contactOptions.EMAIL}</option>
          <option value="PHONE">{t.contactOptions.PHONE}</option>
        </select>
      </Field>
      <Field label={t.phone}>
        <input type="tel" className={inputClass} value={data.phone} onChange={(e) => onChange("phone", e.target.value)} autoComplete="tel" />
      </Field>
      <Field label={t.whatsapp}>
        <input className={inputClass} value={data.whatsapp} onChange={(e) => onChange("whatsapp", e.target.value)} />
      </Field>
      <Field label={t.telegram}>
        <input className={inputClass} value={data.telegram} onChange={(e) => onChange("telegram", e.target.value)} />
      </Field>
    </div>
  );
}
