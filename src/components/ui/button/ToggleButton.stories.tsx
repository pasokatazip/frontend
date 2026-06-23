import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ToggleButton } from "./ToggleButton";

const meta = {
  title: "UI/Button",
  component: ToggleButton,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="flex gap-24 bg-[#949492] p-12">
        <Story />
      </div>
    ),
  ],
  args: {
    "aria-label": "設定を切り替える",
  },
} satisfies Meta<typeof ToggleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ToggleOn: Story = {
  args: {
    defaultPressed: true,
  },
};

export const ToggleOff: Story = {};
