import React from 'react';

function AlgorithmPicker({selectedAlgorithm, onAlgorithmChange}) {
    const handleChange = (event) => {
        onAlgorithmChange(event.target.value);
    }

    return (
      <label>
        <span className='algorithm-label'>Choose algorithm: </span>
        <select name="selectedAlgorithm" value={selectedAlgorithm} onChange={handleChange}>
          <option value="dilithium2">Dilithium-2</option>
          <option value="dilithium3">Dilithium-3</option>
          <option value="dilithium5">Dilithium-5</option>
          <option value="falcon512">Falcon-512</option>
          <option value="falcon1024">Falcon-1024</option>
        </select>
      </label>
    );
  }
  
  export default AlgorithmPicker;