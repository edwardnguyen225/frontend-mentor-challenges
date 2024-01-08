import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'S',
    width: 'w-[255px]',
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  // eslint-disable-next-line unused-imports/no-unused-vars
  render: ({ onClick, ...args }) => (
    // eslint-disable-next-line no-alert
    <Button onClick={() => alert('Button clicked')} {...args} />
  ),
};
