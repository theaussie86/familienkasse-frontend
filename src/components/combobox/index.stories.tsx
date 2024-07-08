import { StoryObj, Meta } from "@storybook/react";

import { Combobox } from ".";

const meta: Meta<typeof Combobox> = {
  title: "Components/Combobox",
  tags: ["autodocs"],
  args: {
    options: [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
    ],
  },
  component: Combobox,
};
export default meta;

type Story = StoryObj<typeof Combobox>;

export const Default: Story = {};

export const WithPlaceholder = {
  args: {
    placeholder: "Select an option",
  },
};

export const Disabled = {
  args: {
    disabled: true,
  },
};
