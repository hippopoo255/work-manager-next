import React from 'react'

export type Child = {
  id: string
  to: string
  icon: any
  text: string
}
export type Menu = {
  id: string
  icon: any
  text: string
  to: string
  children?: Child[]
  open?: boolean
}

export type Menus = {
  [k: string]: Menu[]
}
