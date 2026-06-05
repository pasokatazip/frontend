import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "テキスト",
    variant: "green",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["green"],
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[min(80vw,64rem)] overflow-visible bg-white p-12">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
