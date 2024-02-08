import React, { useState } from 'react';
import './sos.scss';

const Sos = () => {
  const defaultNumber = "03227607602";
  const [editedNumber, setEditedNumber] = useState<string>(defaultNumber);

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = event.target.value;

    // Remove leading zeros and update the state
    setEditedNumber(newInput.replace(/^0+/, ''));
  };

  return (
    <div className="number-editor-screen">
      <h2>Number Editor</h2>
      <input
        type="text"  // Change type to text to allow leading zeros
        value={editedNumber}
        onChange={handleNumberChange}
        className="number-input"
      />
      <div className="result">Result: {editedNumber || '0'}</div>
    </div>
  );
};

export default Sos
