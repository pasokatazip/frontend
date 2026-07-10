import { BlueButton } from "@/components/ui/button/BlueButton";
import { GreenButton } from "@/components/ui/button/GreenButton";
import { RoundButton } from "@/components/ui/button/RoundButton";
import { GlassCard } from "@/components/ui/card/GlassCard";
import Image from "next/image";
import { CalendarButton } from "./CalendarButton";
import { CalendarPicker } from "./CalendarPicker";
import { DateSelector } from "./DateSelector";
import { ScrollArea } from "./ScrollArea";
import Link from "next/link";
import { SouvenirBox } from "./SouvenirBox";
import { RewardModal } from "./RewardModal";
import type { Souvenir } from "@/types/souvenir";

type ReportViewProps = {
  reportInfo: {
    date: Date;
    selectDate: string;
    title: string;

    openCalendar: boolean;

    prevDay: () => void;
    nextDay: () => void;

    openCalendarPicker: () => void;
    closeCalendarPicker: () => void;

    onSelectDate: (date: Date) => void;

    todaySouvenirs: Souvenir[];
    onPraise: () => void;

    openRewardModal: boolean;
    closeRewardModal: () => void;
  };
  petImage: {
    alt: string;
    height: number;
    src: string;
    width: number;
  };
};

export function ReportView({ reportInfo, petImage }: ReportViewProps) {
  return (
    <>
      <main className="mobile-screen bg-[url('/images/report/background.png')] bg-cover bg-center min-h-svh p-4">
        <div className="flex flex-col gap-3.5">
          <CalendarButton
            text={reportInfo.selectDate}
            onClick={reportInfo.openCalendarPicker}
          />

          <DateSelector
            text={reportInfo.title}
            onPrev={reportInfo.prevDay}
            onNext={reportInfo.nextDay}
            onOpen={reportInfo.openCalendarPicker}
          />

          <CalendarPicker
            open={reportInfo.openCalendar}
            selectedDate={reportInfo.date}
            onSelect={reportInfo.onSelectDate}
            onClose={reportInfo.closeCalendarPicker}
          />

          <article>
            <GlassCard className="px-5.5 p-6 min-h-100 text-[10px] text-[#4C4F5E]">
              <div className="h-90">
                <ScrollArea>
                  <div className="flex flex-col gap-4">
                    <p className="flex gap-2 text-[12px] [text-shadow:0_0_2px_#5BD4EC]">
                      <span
                        className="
                          block w-5 h-5
                          bg-[url('/icons/sun.svg')]
                          bg-contain bg-no-repeat
                        "
                      />
                      おはYO
                      <span className="text-shadow-none">・00:00</span>
                    </p>
                    <div className="flex flex-col gap-0.5">
                      <p className="flex gap-2 text-[12px] [text-shadow:0_0_2px_#5BD4EC]">
                        <span
                          className="
                            block w-5 h-5
                            bg-[url('/icons/bubble.svg')]
                            bg-contain bg-no-repeat
                          "
                        />
                        見出し
                        <span className="text-shadow-none">・00:00</span>
                      </p>

                      <div className="ml-7">
                        <p className="text-gray-600">群れのうわさ</p>

                        <ul className="list-disc list-inside">
                          <li>つぶやき内容</li>
                          <li>つぶやき内容</li>
                        </ul>
                      </div>
                    </div>
                    <p className="flex gap-2 text-[12px] [text-shadow:0_0_2px_#5BD4EC]">
                      <span
                        className="
                          block w-5 h-5
                          bg-[url('/icons/sleep.svg')]
                          bg-contain bg-no-repeat
                        "
                      />
                      おやすみだYO〜
                      <span className="text-shadow-none">・00:00</span>
                    </p>
                  </div>
                </ScrollArea>
              </div>
            </GlassCard>
          </article>
        </div>

        <div className="flex mt-4.5 gap-9 mb-24">
          {reportInfo.todaySouvenirs.length === 0 ? (
            <BlueButton
              className="rounded-xl h-[120px]"
              onClick={reportInfo.onPraise}
            >
              ほめる！
            </BlueButton>
          ) : (
            <SouvenirBox souvenirs={reportInfo.todaySouvenirs} />
          )}
          <Image
            src={petImage.src}
            alt={petImage.alt}
            width={petImage.width}
            height={petImage.height}
            priority
          />
        </div>
        <RewardModal
          open={reportInfo.openRewardModal}
          onClose={reportInfo.closeRewardModal}
          souvenirs={reportInfo.todaySouvenirs}
        />
      </main>

      <footer className="fixed bottom-3 flex min-w-full gap-20 px-4">
        <Link href="/Home">
          <RoundButton image="/icons/home.svg" label="ホームへ" />
        </Link>
        <Link href="/GrowRecord" className="w-full">
          <GreenButton className="rounded-xl rounded-br-none max-h-15">
            成長きろく
          </GreenButton>
        </Link>
      </footer>
    </>
  );
}
