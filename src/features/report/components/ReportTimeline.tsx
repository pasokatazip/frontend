import type { Report } from "../schemas/ReportSchema";
import { ScrollArea } from "./ScrollArea";

type Props = {
  reports: Report[];
};

export function ReportTimeline({ reports }: Props) {
  return (
    <div className="h-90">
      <ScrollArea>
        <div className="flex flex-col gap-4">
          {/* <p className="flex gap-2 text-[12px] [text-shadow:0_0_2px_#5BD4EC]">
            <span
              className="
                          block w-5 h-5
                          bg-[url('/icons/sun.svg')]
                          bg-contain bg-no-repeat
                        "
            />
            おはYO
          </p> */}
          {reports.length === 0 ? (
            <div className="flex h-full items-center justify-center text-gray-500">
              まだこの日の記録はないYO！
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {reports.map((report) => (
                <div key={report.id}>
                  <p className="flex gap-2 text-[12px] [text-shadow:0_0_2px_#5BD4EC]">
                    <span
                      className="
                      block w-5 h-5
                      bg-[url('/icons/bubble.svg')]
                      bg-contain bg-no-repeat
                    "
                    />
                    {report.gossip}
                    <span className="shrink-0 text-shadow-none">
                      ・{report.hourSlot}:00
                    </span>
                  </p>

                  <div className="ml-7">
                    <p className="text-gray-600">群れのウワサ</p>

                    <ul className="list-disc list-inside">
                      {report.rumors && report.rumors.length > 0 ? (
                        report.rumors.map((rumor, index) => (
                          <li key={index}>{rumor}らしい…</li>
                        ))
                      ) : (
                        <li>特にうわさはなかったみたい…</li>
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* <p className="flex gap-2 text-[12px] [text-shadow:0_0_2px_#5BD4EC]">
            <span
              className="
                          block w-5 h-5
                          bg-[url('/icons/sleep.svg')]
                          bg-contain bg-no-repeat
                        "
            />
            おやすみだYO〜
          </p> */}
        </div>
      </ScrollArea>
    </div>
  );
}
