import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
export const EditableContext = React.createContext('');

export const EditableRow = ({...props}) => {
  const [form] : any = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} >{props.children}</tr>
      </EditableContext.Provider>
    </Form>
  );
};