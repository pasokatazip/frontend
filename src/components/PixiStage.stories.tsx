import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PixiStage } from "./PixiStage";

const meta = {
  title: "Components/PixiStage",
  component: PixiStage,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[640px] max-w-[calc(100vw-2rem)]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PixiStage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
