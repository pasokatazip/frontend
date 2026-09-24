import { RoundButton } from "@/components/ui/button/RoundButton";
import Link from "next/link";

export function SettingFooter() {
  return (
    <div className="mobile-safe-footer fixed mt-auto flex items-end justify-between pb-1">
      <Link href="/Home">
        <RoundButton image="/icons/home.svg" label="ホームへ" />
      </Link>
    </div>
  );
}
