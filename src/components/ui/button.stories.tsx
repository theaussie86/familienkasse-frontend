import { StoryObj, Meta } from "@storybook/react";

import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  tags: ["autodocs"],
  args: {
    children: "Button text",
  },
  argTypes: {
    variant: {
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      control: { type: "radio" },
    },
    size: {
      options: ["default", "sm", "lg", "icon"],
      control: { type: "radio" },
    },
  },
  component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Disabled = {
  args: {
    disabled: true,
  },
};
