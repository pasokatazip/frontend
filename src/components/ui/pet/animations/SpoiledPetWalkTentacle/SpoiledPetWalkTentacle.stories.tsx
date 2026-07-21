import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SpoiledPetWalkTentacleAnimation } from "./SpoiledPetWalkTentacleAnimation";

const meta = {
  title: "UI/Pet/Animations/SpoiledPetWalkTentacle",
  component: SpoiledPetWalkTentacleAnimation,
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
} satisfies Meta<typeof SpoiledPetWalkTentacleAnimation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
