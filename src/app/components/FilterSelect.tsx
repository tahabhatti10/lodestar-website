import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";

interface FilterSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  fullWidth?: boolean;
}

export function FilterSelect({
  label,
  options,
  value,
  onChange,
  fullWidth,
}: FilterSelectProps) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        className={`inline-flex items-center justify-between gap-2 border px-4 py-2.5 text-[14px] text-black transition-colors hover:border-black/60 focus:outline-none ${
          fullWidth ? "w-full" : "min-w-[130px]"
        }`}
        style={{ borderColor: "var(--ls-grey-300)" }}
        aria-label={label}
      >
        <Select.Value placeholder={label} />
        <Select.Icon>
          <ChevronDown size={16} className="text-black/50" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={6}
          className="z-[60] min-w-[var(--radix-select-trigger-width)] overflow-hidden border bg-white shadow-lg"
          style={{ borderColor: "var(--ls-grey-300)" }}
        >
          <Select.Viewport className="p-1">
            {options.map((opt) => (
              <Select.Item
                key={opt}
                value={opt}
                className="relative flex cursor-pointer select-none items-center px-8 py-2 text-[14px] text-black outline-none data-[highlighted]:bg-[var(--ls-grey-100)]"
              >
                <Select.ItemText>{opt}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                  <Check size={14} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
