import React, { useState } from 'react';
import { Input, Form } from 'antd';

interface IInputLabelProps {
  title: '',
  dataIndex: ''
  onChange: any
}

export const InputLabel = (props: IInputLabelProps) => {
  const { title, onChange} = props;
  if (title) {
    return <div>
      {
        title && <span>{title}</span>
      }
    <Input {...props}/>
  </div>
  }
  return (
    <Form.Item style={{ margin: 0}}
      name={props.dataIndex || ''}>
      <Input {...props}/>
    </Form.Item>
  );
};

export default InputLabel;
