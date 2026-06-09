import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GreenButton } from "./GreenButton";

const meta = {
  title: "UI/Button",
  component: GreenButton,
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
} satisfies Meta<typeof GreenButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Green: Story = {};
