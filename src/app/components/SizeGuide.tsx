import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

const ROWS = [
  { us: "US 7", uk: "6", eu: "40", cm: "25.0" },
  { us: "US 8", uk: "7", eu: "41", cm: "26.0" },
  { us: "US 9", uk: "8", eu: "42.5", cm: "27.0" },
  { us: "US 10", uk: "9", eu: "44", cm: "28.0" },
  { us: "US 11", uk: "10", eu: "45", cm: "29.0" },
  { us: "US 12", uk: "11", eu: "46", cm: "30.0" },
];

export function SizeGuide({ trigger }: { trigger: React.ReactNode }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[100] w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white p-6 outline-none">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title
              className="uppercase leading-none text-black text-[28px]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              Size guide
            </Dialog.Title>
            <Dialog.Close aria-label="Close">
              <X size={20} />
            </Dialog.Close>
          </div>
          <Dialog.Description className="mb-4 text-[13px] text-black/55">
            All sizes are in men's US. Measure your foot from heel to toe and match
            it to the length below.
          </Dialog.Description>
          <table className="w-full text-left text-[14px]">
            <thead>
              <tr className="border-b" style={{ borderColor: "var(--ls-grey-300)" }}>
                <th className="py-2 font-semibold text-black">US</th>
                <th className="py-2 font-semibold text-black">UK</th>
                <th className="py-2 font-semibold text-black">EU</th>
                <th className="py-2 font-semibold text-black">Foot (cm)</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.us} className="border-b" style={{ borderColor: "var(--ls-grey-100)" }}>
                  <td className="py-2.5 text-black">{r.us}</td>
                  <td className="py-2.5 text-black/70">{r.uk}</td>
                  <td className="py-2.5 text-black/70">{r.eu}</td>
                  <td className="py-2.5 text-black/70">{r.cm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
