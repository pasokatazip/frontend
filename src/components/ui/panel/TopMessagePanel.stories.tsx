import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TopMessagePanel } from "./TopMessagePanel";

const meta = {
  title: "UI/Panel/TopMessagePanel",
  component: TopMessagePanel,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-[url('/images/background.png')] bg-cover bg-center">
        <div className="mx-auto w-full max-w-[29rem]">
          <Story />
        </div>
      </div>
    ),
  ],
  args: {
    children: "メッセージを表示",
  },
} satisfies Meta<typeof TopMessagePanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
