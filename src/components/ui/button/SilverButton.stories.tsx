import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ButtonHTMLAttributes } from "react";
import { SilverButton } from "./SilverButton";

type SilverButtonStoryArgs = ButtonHTMLAttributes<HTMLButtonElement>;

const meta = {
  title: "UI/Button",
  component: SilverButton,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "テキスト",
  },
  decorators: [
    (Story) => (
      <div className="w-[min(80vw,64rem)] overflow-visible bg-white p-12">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<SilverButtonStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Silver: Story = {};
