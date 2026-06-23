import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SilverCheckBox } from "./SilverCheckBox";


const meta = {
  title: "UI/SilverCheckbox",
  component: SilverCheckBox,
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
} satisfies Meta<typeof SilverCheckBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};
