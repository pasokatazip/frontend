import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BrattyPetTwoLegsAnimation } from "./BrattyPetTwoLegsAnimation";

const meta = {
  title: "UI/Pet/Animations/BrattyPetTwoLegs",
  component: BrattyPetTwoLegsAnimation,
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
} satisfies Meta<typeof BrattyPetTwoLegsAnimation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
