import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BabyPetYoAnimation } from "./BabyPetYoAnimation";

const meta = {
  title: "UI/Pet/Animations/BabyPetYo",
  component: BabyPetYoAnimation,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    className: "w-60",
    hueRotate: 0,
  },
  argTypes: {
    hueRotate: {
      control: { max: 360, min: 0, step: 1, type: "range" },
    },
  },
} satisfies Meta<typeof BabyPetYoAnimation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
