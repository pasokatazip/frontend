import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BlueCheckBox } from "./BlueCheckBox";

const meta = {
  title: "UI/BlueCheckbox",
  component: BlueCheckBox,
  parameters: {
    layout: "centered",
  },
  args: {
    "aria-label": "項目を選択する",
  },
  decorators: [
    (Story) => (
      <div className="bg-[#949492] p-12">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BlueCheckBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};
