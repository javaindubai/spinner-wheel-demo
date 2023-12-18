// PickerWheelCanvas.js
import React, { useState, useEffect, useRef } from 'react';

const PickerWheelCanvas = ({ options }) => {
  const canvasRef = useRef(null);
  const [spinning, setSpinning] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [spinDuration, setSpinDuration] = useState(3000);
  const rotationStep = 360 / options.length;
  const [canvas, setCanvas] = useState(null);
  const [context, setContext] = useState(null);
  const drawWheel = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the wheel
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, 2 * Math.PI);
    context.fillStyle = '#e0e0e0';
    context.fill();

    // Draw the options
    options.forEach((option, index) => {
      const startAngle = (index * rotationStep * Math.PI) / 180;
      const endAngle = ((index + 1) * rotationStep * Math.PI) / 180;

      context.beginPath();
      context.moveTo(canvas.width / 2, canvas.height / 2);
      context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, startAngle, endAngle);
      context.fillStyle = `hsl(${(index * 360) / options.length}, 70%, 80%)`;
      context.fill();
       // Draw text in the center of the option slice
        const textAngle = (startAngle + endAngle) / 2;
        const textRadius = canvas.width / 2 - 30; // Adjust the radius as needed
        const textX = canvas.width / 2 + textRadius * Math.cos(textAngle);
        const textY = canvas.height / 2 + textRadius * Math.sin(textAngle);

        context.fillStyle = '#333';
        context.font = '14px Arial';
        context.textAlign = 'center';
        context.fillText(option, textX, textY);
    });
  };
  useEffect(() => {
    setCanvas(canvasRef.current);
    setContext(canvasRef.current.getContext('2d'));
  }, [options, rotationStep]);

  const spinWheel = () => {
    if (!spinning) {
        setSelectedOption('');
      const randomIndex = Math.floor(Math.random() * options.length);
      

      setSpinning(true);

      const spinInterval = 15; // milliseconds
      const totalSpinTime = spinDuration;
      const startTime = Date.now();

      const spinAnimation = () => {
        const elapsed = Date.now() - startTime;

        if (elapsed < totalSpinTime) {
          const spinAngle = (elapsed / totalSpinTime) * 360;
          const currentRotation = (rotationStep * randomIndex + spinAngle) % 360;

          context.clearRect(0, 0, canvas.width, canvas.height);
          context.save();
          context.translate(canvas.width / 2, canvas.height / 2);
          context.rotate((currentRotation * Math.PI) / 180);
          context.translate(-canvas.width / 2, -canvas.height / 2);
          drawWheel();
          context.restore();

          requestAnimationFrame(spinAnimation);
        } else {
            const selected = options[randomIndex];
          setSpinning(false);
          setSelectedOption(selected);
        }
      };

      spinAnimation();
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
        setSpinDuration(10000);
        break;
      default:
        setSpinDuration(3000);
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} width={500} height={500} style={{ border: '2px solid #333', borderRadius: '50%' }} />
      <button onClick={spinWheel} disabled={spinning}>
        Spin
      </button>
      <div>{selectedOption}</div>
      <div>
        Speed:
        <select onChange={(e) => handleSpeedChange(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
  );
};

export default PickerWheelCanvas;
