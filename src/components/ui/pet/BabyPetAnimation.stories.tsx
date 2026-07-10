import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BabyPetAnimation } from "./BabyPetAnimation";

const meta = {
  title: "UI/Pet/BabyPetAnimation",
  component: BabyPetAnimation,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    className: "w-60",
    hueRotate: 212,
  },
  argTypes: {
    hueRotate: {
      control: { max: 360, min: 0, step: 1, type: "range" },
    },
  },
} satisfies Meta<typeof BabyPetAnimation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};


