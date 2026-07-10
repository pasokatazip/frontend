import Image from "next/image";

type GrowStage = {
  stage: string;
  unlocked: boolean;
  image: string;
};

type GrowWayProps = {
  stages: GrowStage[];
};

export function GrowWay({ stages }: GrowWayProps) {
  return (
    <div className="flex mt-5 max-w-full text-[#4C4F5E] mb-24">
      {stages.map((stage) => (
        <div key={stage.stage} className="flex flex-col w-1/3">
          <p className="bg-white/30 py-2 px-4 mr-7 rounded-full">
            {stage.stage}
          </p>

          <Image
            src={stage.unlocked ? stage.image : "/images/report/noPet.png"}
            alt={stage.stage}
            className="self-start w-full"
            width={120}
            height={120}
          />
        </div>
      ))}
    </div>
  );
}
