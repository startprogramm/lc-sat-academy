import { Check } from "lucide-react";
import { BubbleMark } from "@/components/logo";

export function QuestionCardStack() {
  return (
    <div className="mx-auto w-full max-w-sm [perspective:1400px]">
      <div className="relative h-64">
        {/* Back cards, fanned and peeking out */}
        <div className="absolute inset-0 translate-x-4 translate-y-5 rotate-[8deg] rounded-2xl border border-line bg-white p-5 opacity-70">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-brand">
            Central idea
          </span>
        </div>
        <div className="absolute inset-0 -translate-x-3 translate-y-6 rotate-[-6deg] rounded-2xl border border-line bg-white p-5 opacity-85">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-brand">
            Linear equations
          </span>
        </div>

        {/* Front card: flips on hover (mouse) or press-and-hold (touch) to reveal the explanation */}
        <div className="group absolute inset-0 [transform-style:preserve-3d] transition-transform duration-500 ease-out hover:[transform:rotateY(180deg)] active:[transform:rotateY(180deg)]">
          <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-line bg-white p-6 [backface-visibility:hidden]">
            <div>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-brand">
                Punctuation · Medium
              </span>
              <p className="mt-3 text-base leading-6 text-ink">
                Which choice best maintains the sentence&apos;s pattern of
                punctuation?
              </p>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-ink-soft">
              <BubbleMark className="h-3.5 w-3.5" />
              <span className="pointer-coarse:hidden">
                Hover to check the answer
              </span>
              <span className="hidden pointer-coarse:inline">
                Press and hold to check the answer
              </span>
            </div>
          </div>

          <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-forest bg-white p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div>
              <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-forest">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
                Correct: C
              </span>
              <p className="mt-3 text-base leading-6 text-ink">
                Choice C keeps parallel structure with the two clauses before
                it — the same reason the other options break.
              </p>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-wide text-ink-soft">
              Every question ships with this
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
