import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SpoiledPetYoTentacleAnimation } from "./SpoiledPetYoTentacleAnimation";

const meta = {
  title: "UI/Pet/Animations/SpoiledPetYoTentacle",
  component: SpoiledPetYoTentacleAnimation,
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
} satisfies Meta<typeof SpoiledPetYoTentacleAnimation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
