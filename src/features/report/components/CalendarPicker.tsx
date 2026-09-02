import { GlassCard } from "@/components/ui/card/GlassCard";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

type CalendarPickerProps = {
  open: boolean;
  selectedDate: Date;
  onSelect: (date: Date) => void;
  onClose: () => void;
};

export function CalendarPicker({
  open,
  selectedDate,
  onSelect,
  onClose,
}: CalendarPickerProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <GlassCard
        className="rounded-xl bg-white text-black p-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            if (!date) return;
            onSelect(date);
          }}
        />
      </GlassCard>
    </div>
  );
}
