import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import TemperatureRegister from './projects/temperatureRegister';

function App() {
  return (
    <div className="App">
      <TemperatureRegister />
      <div id="app-dialog" />
    </div>

  );
}

export default App;
