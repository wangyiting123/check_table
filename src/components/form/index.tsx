import React, { useState, Component } from 'react';
import {
  Modal, Button, Form, Input,
} from 'antd';
import { InputLabel, SelectLabel } from '../index';

interface IBasicComponent {
  name: string,
  params: any
}

interface props {
  config: IBasicComponent[]
}
const FormLabel = (props: props) => {
  const { config } = props;
  const input = (data: any, index: number) => (
    <InputLabel
      {...data}
      key={index}
    />
  );
  const select = (data: any, index: number) => (
    <SelectLabel
      {...data}
      key={index}
    />
  );
  return (
    <div>
      {
        config && config.map((item, index) => item.name && eval(item.name)(item.params, index))
      }
    </div>
  );
};

export default FormLabel;
