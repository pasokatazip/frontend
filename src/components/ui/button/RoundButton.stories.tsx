import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RoundButton } from "./RoundButton";

const meta = {
  title: "UI/Button",
  component: RoundButton,
  parameters: {
    layout: "centered",
  },
  args: {
    image: "https://picsum.photos/200",
    label: "テキスト",
  },
  decorators: [
    (Story) => (
      <div className="w-[min(80vw,64rem)] overflow-visible bg-white p-12">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RoundButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Round: Story = {};
