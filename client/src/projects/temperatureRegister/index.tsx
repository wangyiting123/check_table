import React, { useState } from 'react';
import HeaderList from './headerList';
import BodyTable from './bodyTable';
import './index.css';

class TemperatureRegister extends React.Component {
  render() {
    return (
      <div>
        <HeaderList />
        <BodyTable />
      </div>
    );
  }
}

export default TemperatureRegister;
