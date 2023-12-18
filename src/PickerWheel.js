// PickerWheel.js
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 2px solid #333;
`;

const Wheel = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${(props) => (props.spinning ? spin : 'none')} ${(props) => props.spinDuration}ms linear;
  transform: ${(props) => (props.spinning ? 'rotate(360deg)' : 'none')};
  transition: transform ${(props) => props.spinDuration}ms linear;
  position: relative;
`;

const Option = styled.div`
  width: 110px; /* Adjust the size of each option as needed */
  position: absolute;
  transform-origin: 100%;
  transform: ${(props) => `rotate(${props.rotation}deg) translateX(100px) rotate(${-props.rotation}deg)`};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  background-color: #333;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const Arrow = styled.div`
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 15px solid #333;
  position: absolute;
  top: calc(50% + 5px);
  left: calc(50% - 5px);
  transform: rotate(${(props) => props.rotation}deg);
  z-index: 2;
`;

const SpinButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

const SpeedControl = styled.div`
  margin-top: 10px;
`;

const PickerWheel = ({ options }) => {
  const [spinning, setSpinning] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [spinDuration, setSpinDuration] = useState(3000); // Default duration
  const rotationStep = 360 / options.length;
  const arrowRotation = (360 - rotationStep / 2);
  const spinWheel = () => {
    if (!spinning) {
      const randomIndex = Math.floor(Math.random() * options.length);
      const selected = options[randomIndex];

      setSpinning(true);

      setTimeout(() => {
        setSelectedOption(selected);
        setSpinning(false);
      }, spinDuration);
    }
  };

  const handleSpeedChange = (speed) => {
    switch (speed) {
      case 'low':
        setSpinDuration(5000);
        break;
      case 'medium':
        setSpinDuration(3000);
        break;
      case 'high':
        setSpinDuration(1000);
        break;
      default:
        setSpinDuration(3000);
    }
  };

  return (
    <div>
    <Container>
      <Wheel spinning={spinning} spinDuration={spinDuration}>
        {options.map((option, index) => (
          <Option key={index} rotation={index * rotationStep}>
            {option}
          </Option>
        ))}
        <Spinner />
        <Arrow rotation={arrowRotation}  />
      </Wheel>
      </Container>
      <SpinButton onClick={spinWheel} disabled={spinning}>
        Spin
      </SpinButton>
      <SpeedControl>
        <label>
          Speed:
          <select onChange={(e) => handleSpeedChange(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
      </SpeedControl>
      <div>{selectedOption}</div>
    
    </div>
  );
};

export default PickerWheel;
