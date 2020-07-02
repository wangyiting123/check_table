import {
  Menu, Table, Input, Button, Popconfirm, Form,
} from 'antd';
import React, {
  useContext, useState, useEffect, useRef,
} from 'react';

export const getMenuList = (list: any[]) => (
  <Menu>
    {
      list.map((item, index) => (
        <Menu.Item key={index}>
          <a onClick={item.click.bind(null, item)}>{item.name}</a>
        </Menu.Item>
      ))
    }
  </Menu>
);
