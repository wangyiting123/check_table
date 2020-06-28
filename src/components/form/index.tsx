import React, { useState, Component } from 'react';
import { InputLabel, SelectLabel } from '../index';
import { Modal, Button, Form, Input } from 'antd';

interface IBasicComponent {
    name: string,
    params: any
}

interface props {
    config: IBasicComponent[]
}
 const FormLabel = (props: props) => {
    const { config } = props;
    const input = (data: any, index: number) => {
        return <InputLabel {...data} key = {index}/>
    }
    const select = (data: any, index: number) => {
        return <SelectLabel {...data} key = {index}/>
    }
    return <div>
        {
            config && config.map((item, index) => {
                return item['name'] && eval(item['name'])(item.params, index)
            })
        }
    </div>
  };

  export default FormLabel;
