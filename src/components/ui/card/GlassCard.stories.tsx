import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GlassCard } from "./GlassCard";

const meta = {
  title: "UI/Card/GlassCard",
  component: GlassCard,
  tags: ["autodocs"],
} satisfies Meta<typeof GlassCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <GlassCard className="h-72 w-[40rem] max-w-full" />,
};
