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
    outputFormat: 'base64',
  }

  toggleOutputFormat = () => {
    this.setState(prevState => ({
      outputFormat: prevState.outputFormat === 'base64' ? 'hex' : 'base64'
    }));
  }

  handleAlgorithmChange = (selectedAlgorithm) => {
    this.setState({selectedAlgorithm});
  }
  
  render() {
    const {selectedAlgorithm} = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <h1>{'{ PQC Signer }'}</h1>
          <h2>A simple tool to play with PQC signatures.</h2>
        </div>
        <div className="flex-container-outer">
          <div><AlgorithmPicker selectedAlgorithm={selectedAlgorithm} onAlgorithmChange={this.handleAlgorithmChange} /></div>
          <button onClick={this.toggleOutputFormat}>Toggle hex / base64</button>
          <div><KeyPairGenerator apiBaseUrl={API_BASE_URL} algorithm={selectedAlgorithm} /></div>
          <div><SignatureGenerator apiBaseUrl={API_BASE_URL} algorithm={selectedAlgorithm} /></div>
          <div><SignatureVerifier apiBaseUrl={API_BASE_URL} algorithm={selectedAlgorithm} /></div>
        </div>
      </div>
    );
  }
}

export default App;
