import React, { useState } from 'react';
import { Input, Form } from 'antd';
import { Select } from 'antd';

const { Option } = Select;

interface ISelectLableProps {
    title: string,
    dataIndex?: string,
    options: any[],
    onChange: any
}

const SelectLabel = (props: ISelectLableProps) => {
    const { title, onChange, options } = props;
    const select = () => {
        return <Select style={{ width: 120 }} onChange={onChange}>
                {
                    options && options.map((item: any, index: number) => {
                    return <Option value={item.title} key = {index}>{item.title}</Option>
                    })
                }
            </Select>
    } 
    if (title) {
        return <div>
          {
            title && <span>{title}</span>
          }
        { select() }
      </div>
      }
      return (
        <Form.Item style={{ margin: 0}}
          name={props.dataIndex || ''}>
            { select() }
        </Form.Item>
      );
   
}

export default SelectLabel;

