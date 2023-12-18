// App.js
import React from 'react';
import PickerWheel from './PickerWheel';
import PickerWheelCanvas from './PickerWheelCanvas';

const App = () => {
  const options = ['java','Option 1 Option 1 Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7', 'Option 8'];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Picker Wheel Demo</h1>
        {/* <PickerWheel options={options} />
        <hr></hr> */}
        <PickerWheelCanvas options={options} />
      </header>
    </div>
  );
};

export default App;