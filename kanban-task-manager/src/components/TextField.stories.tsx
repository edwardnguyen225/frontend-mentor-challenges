import type { Meta, StoryObj } from '@storybook/react';

import TextField from './TextField';

const meta: Meta<typeof TextField> = {
  component: TextField,
  argTypes: {
    label: {
      control: 'text',
      defaultValue: 'Text Field',
    },
    placeholder: {
      control: 'text',
      defaultValue: 'Enter task name',
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextField>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  // eslint-disable-next-line unused-imports/no-unused-vars
  render: (args) => (
    // eslint-disable-next-line no-alert
    <TextField
      {...args}
      label="Text Field"
      placeholder="Enter task name"
      required
    />
  ),
};
