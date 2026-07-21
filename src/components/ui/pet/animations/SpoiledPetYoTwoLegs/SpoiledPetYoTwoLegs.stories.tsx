import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SpoiledPetYoTwoLegsAnimation } from "./SpoiledPetYoTwoLegsAnimation";

const meta = {
  title: "UI/Pet/Animations/SpoiledPetYoTwoLegs",
  component: SpoiledPetYoTwoLegsAnimation,
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
} satisfies Meta<typeof SpoiledPetYoTwoLegsAnimation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
