import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BrattyPetWalkTentacleAnimation } from "./BrattyPetWalkTentacleAnimation";

const meta = {
  title: "UI/Pet/Animations/BrattyPetWalkTentacle",
  component: BrattyPetWalkTentacleAnimation,
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
} satisfies Meta<typeof BrattyPetWalkTentacleAnimation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
