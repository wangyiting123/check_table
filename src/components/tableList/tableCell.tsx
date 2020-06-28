import React, { useContext, useState, useEffect, useRef } from 'react'
import FormLabel from '../form';
import { EditableContext } from './tableRow';


export const EditableCell = (props: any) => {
    const {
      col = {},
      record,
      handleSave,
      children,
      ...restProps
    } = props;
    const [editing, setEditing] = useState(false);
    const form: any = useContext(EditableContext);
  
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [col.dataIndex]: record[col.dataIndex],
      });
    };
  
    const save = async (e: any) => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };

  
    let childNode = children;
    let config = [{
      name: col.type,
      params: {
        onPressEnter: save,
        onBlur: save,
        onChange: save,
        dataIndex: col.dataIndex,
        options: col.options
      }
    }]
    if (col.type === 'input') {
      delete config[0].params.onChange;
    }
    if (col.editable) {
      childNode = editing ? (<FormLabel config = {config}/>)
         : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
  
    return <td {...restProps} >{childNode}</td>;
  };