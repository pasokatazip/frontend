import type { StaticImageData } from "next/image";
import goalImage from "@public/images/tutorial/goal.png";
import reportImage from "@public/images/tutorial/report.png";
import routineImage from "@public/images/tutorial/routine.png";

export type DialogueId =
  | "description"
  | "empty"
  | "introduction"
  | "prompt"
  | "reaction"
  | "touched";

export type LessonId = "goal" | "report" | "routine";

export type TutorialStep =
  | DialogueId
  | LessonId
  | "post"
  | "postFeedback"
  | "postSuccess"
  | "touch";

export type TutorialDestination = TutorialStep | "/Setup";

export type Dialogue = {
  message: string;
  next: TutorialStep;
  nextLabel?: string;
  previous: TutorialStep;
  speaker?: string;
};

export type Lesson = {
  image: StaticImageData;
  imageAlt: string;
  message: string;
  next: TutorialDestination;
  nextLabel?: string;
  previous: TutorialStep;
};

export const dialogues = {
  description: {
    message:
      "YO-YOは気に入った人間の「つぶやき」を聞いて群れをつくり成長する、デジタル不思議新生物！",
    next: "empty",
    previous: "introduction",
    speaker: "Dr.YO博士",
  },
  empty: {
    message: "",
    next: "reaction",
    previous: "description",
  },
  introduction: {
    message:
      "私の名前はDr.YOはかせ\nこの生き物の名前はYO-YO（よーよー）じゃ",
    next: "description",
    previous: "touched",
    speaker: "Dr.YO博士",
  },
  reaction: {
    message: "気に入られたようじゃの\nうらやましいわい",
    next: "prompt",
    previous: "empty",
    speaker: "Dr.YO博士",
  },
  prompt: {
    message:
      "YO-YOに気に入られた人間はつぶやくのが義務じゃ、何かつぶやいてみい！\n内容はなんでもよいぞう",
    next: "post",
    previous: "reaction",
    speaker: "Dr.YO博士",
  },
  touched: {
    message: "今YO-YOをタッチしたのう！",
    next: "introduction",
    nextLabel: "つぎにすすむ",
    previous: "touch",
  },
} satisfies Record<DialogueId, Dialogue>;

export const lessons = {
  goal: {
    image: goalImage,
    imageAlt: "YO-YOのゴール",
    message:
      "YO-YOが将来どの群れに行くのかは、おぬしのつぶやきにかかっておる！\nよろしくたのむぞ",
    next: "/Setup",
    nextLabel: "チュートリアルをおわる",
    previous: "report",
  },
  report: {
    image: reportImage,
    imageAlt: "YO-YOのレポート",
    message:
      "YO-YOは過ごした群れの様子を1日1回、報告してくれるぞい\nおみやげをくれることもあるかもしれんの",
    next: "goal",
    previous: "routine",
  },
  routine: {
    image: routineImage,
    imageAlt: "YO-YOのルーティン",
    message:
      "この通り、YO-YOは人間の「つぶやき」を聞いて群れをつくり成長していくんじゃ",
    next: "report",
    previous: "postFeedback",
  },
} satisfies Record<LessonId, Lesson>;
