import type { Meta, StoryObj } from '@storybook/react';

import Dropdown from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  args: {
    label: 'Dropdown',
    options: ['Todo', 'Doing', 'Done'],
  },
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Primary: Story = {
  render: (args) => (
    <div className="w-[350px]">
      <Dropdown {...args} />
    </div>
  ),
};
