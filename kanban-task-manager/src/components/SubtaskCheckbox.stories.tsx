import type { Meta, StoryObj } from '@storybook/react';

import SubtaskCheckbox from './SubtaskCheckbox';

const meta: Meta<typeof SubtaskCheckbox> = {
  component: SubtaskCheckbox,
  args: {
    id: '1',
    completed: false,
  },
};

export default meta;

type Story = StoryObj<typeof SubtaskCheckbox>;

export const Primary: Story = {
  render: (args) => (
    <div className="w-[350px]">
      <SubtaskCheckbox {...args} />
    </div>
  ),
};
