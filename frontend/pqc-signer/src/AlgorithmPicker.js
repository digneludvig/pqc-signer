import React from 'react';

function AlgorithmPicker({selectedAlgorithm, onAlgorithmChange}) {
    const handleChange = (event) => {
        onAlgorithmChange(event.target.value);
    }

    return (
      <label>
        Choose algorithm:
        <select name="selectedAlgorithm" value={selectedAlgorithm} onChange={handleChange}>
          <option value="dilitihum2">Dilithium-2</option>
          <option value="dilithium3">Dilithium-3</option>
          <option value="dilithium5">Dilithium-5</option>
        </select>
      </label>
    );
  }
  
  export default AlgorithmPicker;