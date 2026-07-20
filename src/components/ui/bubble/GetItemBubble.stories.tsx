import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GetItemBubble } from "./GetItemBubble";

const meta = {
    title: "UI/Bubble/GetItemBubble",
    component: GetItemBubble,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    decorators: [
        (Story) => (
            <div className="min-h-[32rem] w-[min(100vw,32rem)] bg-[url('/images/background.png')] bg-cover bg-center p-8">
                <Story />
            </div>
        ),
    ],
    args: {
        text: "今日のおみやげ",
        souvenirs: [
            {
                image: "/images/souvenir/secret.png",
                name: "おみやげ",
            },
        ],
    },
} satisfies Meta<typeof GetItemBubble>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ThreeSouvenirs: Story = {
    args: {
        souvenirs: [
            {
                image: "/images/souvenir/secret.png",
                name: "たべかけ即席麺",
            },
            {
                image: "/images/souvenir/secret.png",
                name: "スケッチブック",
            },
            {
                image: "/images/souvenir/secret.png",
                name: "うさぎなわとび",
            },
        ],
    },
};
