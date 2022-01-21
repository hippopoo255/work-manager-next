import React, { useState } from 'react'
import { TabList, TabItem } from '@/interfaces/common'
import { Tabs, Tab } from '@material-ui/core'

export type Props = {
  tabList: TabList
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
  variant?: 'scrollable' | 'standard' | 'fullWidth' | undefined
}

const CustomTabs = ({ tabList, value, setValue, variant }: Props) => {
  const handleChange = (event: React.ChangeEvent<{}>, newTab: number) => {
    setValue(newTab)
  }
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
      centered
      variant={variant || 'standard'}
    >
      {tabList.length &&
        tabList.map((tab, index) => <Tab label={tab.label} key={index} />)}
    </Tabs>
  )
}

export default CustomTabs
