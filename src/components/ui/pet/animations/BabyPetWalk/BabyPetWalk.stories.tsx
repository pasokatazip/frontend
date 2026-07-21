import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BabyPetWalkAnimation } from "./BabyPetWalkAnimation";

const meta = {
  title: "UI/Pet/Animations/BabyPetWalk",
  component: BabyPetWalkAnimation,
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
} satisfies Meta<typeof BabyPetWalkAnimation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
