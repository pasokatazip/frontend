import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SpoiledPetFourLegsAnimation } from "./SpoiledPetFourLegsAnimation";

const meta = {
  title: "UI/Pet/Animations/SpoiledPetFourLegs",
  component: SpoiledPetFourLegsAnimation,
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
} satisfies Meta<typeof SpoiledPetFourLegsAnimation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
