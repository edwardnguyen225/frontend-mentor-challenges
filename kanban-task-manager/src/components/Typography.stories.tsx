import type { Meta, StoryObj } from '@storybook/react';

import Typography from './Typography';

const meta: Meta<typeof Typography> = {
  component: Typography,
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Primary: Story = {
  render: () => (
    <div className="grid gap-4">
      <Typography variant="heading-xl">Heading (XL)</Typography>
      <Typography variant="heading-lg">Heading (LG)</Typography>
      <Typography variant="heading-md">Heading (MD)</Typography>
      <Typography variant="heading-sm">Heading (L)</Typography>
      <Typography variant="body-lg">
        Body (L) - Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
        Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque,
        aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula
        sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit
        nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed
        egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus
        metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo
        quis, gravida id, est.
      </Typography>
      <Typography variant="body-md">
        Body (M) - - Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
        Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque,
        aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula
        sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit
        nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed
        egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus
        metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo
        quis, gravida id, est.
      </Typography>
    </div>
  ),
};
