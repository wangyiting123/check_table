import React, { useState } from 'react';
import { Input, Form, Select } from 'antd';

const { Option } = Select;

interface ISelectLableProps {
  title: string,
  dataIndex?: string,
  options: any[],
  onChange: any
}

const SelectLabel = (props: ISelectLableProps) => {
  const { title, onChange, options } = props;
  const select = () => (
    <Select
      onChange={onChange}
      style={{ width: 120 }}
    >
      {
        options && options.map((item: any, index: number) => (
          <Option
            key={index}
            value={item.title}
          >
            {item.title}
          </Option>
        ))
      }
    </Select>
  );
  if (title) {
    return (
      <div>
        {
          title && <span>{title}</span>
        }
        {select()}
      </div>
    );
  }
  return (
    <Form.Item
      name={props.dataIndex || ''}
      style={{ margin: 0 }}
    >
      {select()}
    </Form.Item>
  );
};

export default SelectLabel;
