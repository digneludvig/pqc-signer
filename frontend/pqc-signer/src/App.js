import React, { Component } from 'react';
import './App.css';
import KeyPairGenerator from './KeyPairGenerator'
import SignatureGenerator from './SignatureGenerator'
import SignatureVerifier from './SignatureVerifier'
import AlgorithmPicker from './AlgorithmPicker';

const API_BASE_URL = 'http://localhost:8080'

class App extends Component {
  state = {
    selectedAlgorithm: 'dilithium2',
  }

  handleAlgorithmChange = (selectedAlgorithm) => {
    this.setState({selectedAlgorithm});
  }
  
  render() {
    const {selectedAlgorithm} = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to PQC Signer</h2>
          <h3>A simple tool to play with PQC signatures.</h3>
        </div>
        <AlgorithmPicker selectedAlgorithm={selectedAlgorithm} onAlgorithmChange={this.handleAlgorithmChange} />
        <h2>Press button below to gen keypair.</h2>
        <KeyPairGenerator apiBaseUrl={API_BASE_URL} algorithm={selectedAlgorithm} />
        <SignatureGenerator apiBaseUrl={API_BASE_URL} algorithm={selectedAlgorithm} />
        <SignatureVerifier apiBaseUrl={API_BASE_URL} algorithm={selectedAlgorithm} />
      </div>
    );
  }
}

export default App;
