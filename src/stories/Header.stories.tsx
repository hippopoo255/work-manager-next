import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import React from 'react'

import { Header } from './Header'

export default { component: Header } as ComponentMeta<typeof Header>

// export default {
//   title: 'Example/Header',
//   component: Header,
//   parameters: {
//     // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
//     layout: 'fullscreen',
//   },
// } as ComponentMeta<typeof Header>

export const Index: ComponentStoryObj<typeof Header> = {}
