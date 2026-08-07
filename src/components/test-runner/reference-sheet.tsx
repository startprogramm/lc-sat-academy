"use client";

import { X } from "lucide-react";

type ReferenceSheetProps = {
  open: boolean;
  onClose: () => void;
};

const FORMULAS = [
  { label: "Circle area", value: "A = πr²" },
  { label: "Circle circumference", value: "C = 2πr" },
  { label: "Rectangle area", value: "A = ℓw" },
  { label: "Triangle area", value: "A = ½bh" },
  { label: "Pythagorean theorem", value: "c² = a² + b²" },
  { label: "Rectangular prism volume", value: "V = ℓwh" },
  { label: "Cylinder volume", value: "V = πr²h" },
  { label: "Sphere volume", value: "V = (4/3)πr³" },
  { label: "Cone volume", value: "V = (1/3)πr²h" },
  { label: "Pyramid volume", value: "V = (1/3)ℓwh" },
];

const FACTS = [
  "A circle has 360 degrees of arc, or 2π radians.",
  "The interior angles of a triangle sum to 180°.",
  "In a 30-60-90 triangle, the sides are in the ratio x, x√3, 2x.",
  "In a 45-45-90 triangle, the sides are in the ratio s, s, s√2.",
];

export function ReferenceSheet({ open, onClose }: ReferenceSheetProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-t-2xl border border-line bg-white p-6 sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-ink">
            Reference sheet
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1.5 text-ink-soft transition-colors hover:bg-paper-dim hover:text-ink"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-2">
          {FORMULAS.map((f) => (
            <div key={f.label}>
              <p className="font-mono text-sm font-semibold text-ink">
                {f.value}
              </p>
              <p className="text-xs text-ink-soft">{f.label}</p>
            </div>
          ))}
        </div>

        <ul className="mt-5 space-y-1.5 border-t border-line pt-4 text-xs text-ink-soft">
          {FACTS.map((fact) => (
            <li key={fact}>· {fact}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
