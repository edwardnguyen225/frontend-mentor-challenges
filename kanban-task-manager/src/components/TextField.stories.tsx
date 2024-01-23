import type { Meta, StoryObj } from '@storybook/react';

import TextField from './TextField';

const meta: Meta<typeof TextField> = {
  component: TextField,
  args: {
    label: 'Text Field',
    placeholder: 'Enter task name',
  },
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Primary: Story = {
  render: (args) => <TextField {...args} />,
};
