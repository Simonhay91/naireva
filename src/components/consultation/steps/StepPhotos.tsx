"use client";

import { useRef } from "react";
import Image from "next/image";
import type { ConsultationFormState } from "@/components/consultation/types";
import { Field, inputClass } from "@/components/consultation/Field";
import { MAX_PHOTO_COUNT } from "@/lib/validation/consultation";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function StepPhotos({
  data,
  onChange,
  photos,
  setPhotos,
  dict
}: {
  data: ConsultationFormState;
  onChange: <K extends keyof ConsultationFormState>(key: K, value: ConsultationFormState[K]) => void;
  photos: File[];
  setPhotos: (files: File[]) => void;
  dict: Dictionary;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const t = dict.consultationPage.step3;

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;
    const incoming = Array.from(fileList);
    setPhotos([...photos, ...incoming].slice(0, MAX_PHOTO_COUNT));
  }

  function removeAt(index: number) {
    setPhotos(photos.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-[11px] uppercase tracking-[0.05em] text-[#665f59]">
          {t.photosLabel.replace("{max}", String(MAX_PHOTO_COUNT))}
        </p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full rounded-2xl border border-dashed border-[#cbbfb1] px-6 py-10 text-center text-sm text-muted transition hover:border-wine hover:text-wine"
        >
          {t.dropzone}
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/heic"
            className="hidden"
            onChange={(e) => addFiles(e.target.files)}
          />
        </button>

        {photos.length > 0 && (
          <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {photos.map((file, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden rounded-xl bg-charcoal-soft">
                <Image src={URL.createObjectURL(file)} alt="" fill className="object-cover" unoptimized />
                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-xs text-white opacity-0 transition group-hover:opacity-100"
                  aria-label={t.removePhoto}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
        <p className="mt-3 text-xs text-muted">{t.privacyNote}</p>
      </div>

      <Field label={t.notes} full>
        <textarea rows={3} className={`${inputClass} resize-none`} value={data.notes} onChange={(e) => onChange("notes", e.target.value)} />
      </Field>
    </div>
  );
}
