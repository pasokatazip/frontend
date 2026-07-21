import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ComponentType } from "react";
import type { PetFrameAnimationProps } from "./PetFrameAnimation";
import { BabyPetAnimation } from "./animations/BabyPet/BabyPetAnimation";
import { SpoiledPetTentacleAnimation } from "./animations/SpoiledPetTentacle/SpoiledPetTentacleAnimation";
import { BrattyPetFourLegsAnimation } from "./animations/BrattyPetFourLegs/BrattyPetFourLegsAnimation";
import { BabyPetYoAnimation } from "./animations/BabyPetYo/BabyPetYoAnimation";
import { SpoiledPetYoTentacleAnimation } from "./animations/SpoiledPetYoTentacle/SpoiledPetYoTentacleAnimation";
import { BrattyPetYoFourLegsAnimation } from "./animations/BrattyPetYoFourLegs/BrattyPetYoFourLegsAnimation";
import { BabyPetWalkAnimation } from "./animations/BabyPetWalk/BabyPetWalkAnimation";
import { SpoiledPetWalkTentacleAnimation } from "./animations/SpoiledPetWalkTentacle/SpoiledPetWalkTentacleAnimation";
import { BrattyPetWalkFourLegsAnimation } from "./animations/BrattyPetWalkFourLegs/BrattyPetWalkFourLegsAnimation";
import { SpoiledPetTwoLegsAnimation } from "./animations/SpoiledPetTwoLegs/SpoiledPetTwoLegsAnimation";
import { SpoiledPetFourLegsAnimation } from "./animations/SpoiledPetFourLegs/SpoiledPetFourLegsAnimation";
import { BrattyPetTentacleAnimation } from "./animations/BrattyPetTentacle/BrattyPetTentacleAnimation";
import { BrattyPetTwoLegsAnimation } from "./animations/BrattyPetTwoLegs/BrattyPetTwoLegsAnimation";
import { SpoiledPetYoTwoLegsAnimation } from "./animations/SpoiledPetYoTwoLegs/SpoiledPetYoTwoLegsAnimation";
import { SpoiledPetYoFourLegsAnimation } from "./animations/SpoiledPetYoFourLegs/SpoiledPetYoFourLegsAnimation";
import { BrattyPetYoTentacleAnimation } from "./animations/BrattyPetYoTentacle/BrattyPetYoTentacleAnimation";
import { BrattyPetYoTwoLegsAnimation } from "./animations/BrattyPetYoTwoLegs/BrattyPetYoTwoLegsAnimation";
import { SpoiledPetWalkTwoLegsAnimation } from "./animations/SpoiledPetWalkTwoLegs/SpoiledPetWalkTwoLegsAnimation";
import { SpoiledPetWalkFourLegsAnimation } from "./animations/SpoiledPetWalkFourLegs/SpoiledPetWalkFourLegsAnimation";
import { BrattyPetWalkTentacleAnimation } from "./animations/BrattyPetWalkTentacle/BrattyPetWalkTentacleAnimation";
import { BrattyPetWalkTwoLegsAnimation } from "./animations/BrattyPetWalkTwoLegs/BrattyPetWalkTwoLegsAnimation";

type PetAnimationGalleryArgs = Pick<
  PetFrameAnimationProps,
  "className" | "hueRotate"
>;

type PetAnimationItem = {
  Component: ComponentType<PetAnimationGalleryArgs>;
  name: string;
};

const petAnimationItems: PetAnimationItem[] = [
  { Component: BabyPetAnimation, name: "BabyPet" },
  { Component: SpoiledPetTentacleAnimation, name: "SpoiledPetTentacle" },
  { Component: BrattyPetFourLegsAnimation, name: "BrattyPetFourLegs" },
  { Component: BabyPetYoAnimation, name: "BabyPetYo" },
  { Component: SpoiledPetYoTentacleAnimation, name: "SpoiledPetYoTentacle" },
  { Component: BrattyPetYoFourLegsAnimation, name: "BrattyPetYoFourLegs" },
  { Component: BabyPetWalkAnimation, name: "BabyPetWalk" },
  { Component: SpoiledPetWalkTentacleAnimation, name: "SpoiledPetWalkTentacle" },
  { Component: BrattyPetWalkFourLegsAnimation, name: "BrattyPetWalkFourLegs" },
  { Component: SpoiledPetTwoLegsAnimation, name: "SpoiledPetTwoLegs" },
  { Component: SpoiledPetFourLegsAnimation, name: "SpoiledPetFourLegs" },
  { Component: BrattyPetTentacleAnimation, name: "BrattyPetTentacle" },
  { Component: BrattyPetTwoLegsAnimation, name: "BrattyPetTwoLegs" },
  { Component: SpoiledPetYoTwoLegsAnimation, name: "SpoiledPetYoTwoLegs" },
  { Component: SpoiledPetYoFourLegsAnimation, name: "SpoiledPetYoFourLegs" },
  { Component: BrattyPetYoTentacleAnimation, name: "BrattyPetYoTentacle" },
  { Component: BrattyPetYoTwoLegsAnimation, name: "BrattyPetYoTwoLegs" },
  { Component: SpoiledPetWalkTwoLegsAnimation, name: "SpoiledPetWalkTwoLegs" },
  { Component: SpoiledPetWalkFourLegsAnimation, name: "SpoiledPetWalkFourLegs" },
  { Component: BrattyPetWalkTentacleAnimation, name: "BrattyPetWalkTentacle" },
  { Component: BrattyPetWalkTwoLegsAnimation, name: "BrattyPetWalkTwoLegs" },
];

const meta = {
  title: "UI/Pet/Animations/All",
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    className: "w-28",
    hueRotate: 0,
  },
  argTypes: {
    hueRotate: {
      control: { max: 360, min: 0, step: 1, type: "range" },
    },
  },
} satisfies Meta<PetAnimationGalleryArgs>;

export default meta;

type Story = StoryObj<PetAnimationGalleryArgs>;

export const All: Story = {
  render: ({ className, hueRotate }) => (
    <div className="grid grid-cols-3 gap-8 p-8">
      {petAnimationItems.map(({ Component, name }) => (
        <div className="flex flex-col items-center gap-2" key={name}>
          <Component
            className={className}
            hueRotate={hueRotate}
            key={`${name}-${hueRotate}-${className}`}
          />
          <span className="text-center text-xs text-[#4C4F5E]">{name}</span>
        </div>
      ))}
    </div>
  ),
};
