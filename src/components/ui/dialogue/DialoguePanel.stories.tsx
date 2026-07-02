import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { DialoguePanel } from "./DialoguePanel";

const meta = {
  title: "UI/Dialogue/DialoguePanel",
  component: DialoguePanel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex h-[28rem] w-[24rem] max-w-[calc(100vw-2rem)] items-end overflow-hidden bg-[url('/images/background.png')] bg-cover bg-center p-4">
        <Story />
      </div>
    ),
  ],
  args: {
    message: "今YO-YOをタッチしたのう！",
    onNext: fn(),
    speaker: "Dr.YO博士",
  },
} satisfies Meta<typeof DialoguePanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongMessage: Story = {
  args: {
    message:
      "YO-YOをタッチすると、ペットとふれあえるぞ。いろいろ試してみるのじゃ！",
  },
};
