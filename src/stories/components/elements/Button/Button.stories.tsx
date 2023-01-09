import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { Button } from '~/components/elements/Button'
import { withLayout } from '~/stories/init/withLayout'
export default { component: Button } as ComponentMeta<typeof Button>

export const Default: ComponentStoryObj<typeof Button> = {
  args: {
    text: 'Button',
  },
  argTypes: {
    size: {
      defaultValue: undefined,
      options: ['xs', 'sm', 'lg', 'xl'],
      control: { type: 'select' },
    },
    color: {
      defaultValue: undefined,
      options: [
        'primary',
        'secondary',
        'disabled',
        'danger',
        'success',
        'warning',
        'minutes',
        'task',
        'schedule',
        'chat',
      ],
      control: { type: 'select' },
    },
    round: {
      defaultValue: false,
      options: [true, false, undefined],
      control: { type: 'radio' },
    },
    loading: {
      defaultValue: false,
      options: [true, false, undefined],
      control: { type: 'radio' },
    },
    flat: {
      defaultValue: false,
      options: [true, false, undefined],
      control: { type: 'radio' },
    },
  },
  decorators: [withLayout],
}
