import React, { useState } from 'react';
import { Tabs, Dropdown } from 'antd';

const { TabPane } = Tabs;

export interface ITabItem {
  id: string;
  name: string;
  type: string;
  tabName: any;
}

interface ITabListProps {
  list: Array<ITabItem>,
  onChange?: any
}

const TabList = (props: ITabListProps) => {
  const { list, onChange } = props;
  const tabistChanged = (data: any, e: any) => {
    let selectItem = null;
    list.map((item, index) => {
      if (index == data) {
        selectItem = item;
      }
    })
    onChange && onChange(selectItem);
  }

  return <Tabs onTabClick={tabistChanged} >
  {
    list && list.map((item, index) => {
    return <TabPane tab={item.tabName} key={index} forceRender={true}>
    </TabPane>
    })
  }
  </Tabs>
}
  


export default TabList;