import React, { useState } from 'react';
import { Table } from 'antd';

interface ITableListProps {
  columns: [],
  dataSource: [],
  components: any
}

const TableList = (props: ITableListProps) => {
  const [selectionType, setSelectionType] = useState('checkbox');
  return (
    <div>
      <Table
        className=" self-table"
        pagination={false}
        scroll={{ y: '500px' }}
        {...props}
      />
    </div>
  );
};

export default TableList;
