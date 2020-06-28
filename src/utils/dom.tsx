import { Menu } from "antd"
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';

export const getMenuList = (list: any[]) => {
   return <Menu>
            {
                list.map((item, index) => {
                        return  <Menu.Item key={index}>
                        <a onClick={item.click.bind(null, item)}>{item.name}</a>
                    </Menu.Item>
                })
            }
        </Menu>
}


