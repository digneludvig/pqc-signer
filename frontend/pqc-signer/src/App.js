import React, { Component } from 'react';
import './App.css';

const API_BASE_URL = 'http://localhost:8080'

class KeyPairGenerator extends Component {
  state = {
    privateKey: '',
    publicKey: ''
  }

  generateKeyPair = () => {
    fetch(`${API_BASE_URL}/dilithium2/keypair`, {method: 'GET'})
      .then(response => response.json())
      .then(data => {
        this.setState({
          privateKey: data.privateKey,
          publicKey: data.publicKey
        });
      })
      .catch(error => console.error('Error:', error));
  }

  render() {
    return (
      <div>
        <button onClick={this.generateKeyPair}>Generate Key Pair</button>
        <div>
          <h3>Private Key:</h3>
          <textarea readOnly value={this.state.privateKey} />
        </div>
        <div>
          <h3>Public Key:</h3>
          <textarea readOnly value={this.state.publicKey} />
        </div>
      </div>
    );
  }
}

class SignatureGenerator extends Component {
  state = {
    message: '',
    privateKey: '',
    signature: ''
  }

  signMessage = () => {

  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          name="message"
          placeholder="Message to sign"
          value={this.state.message}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          name="privateKey"
          placeholder="Private key"
          value={this.state.privateKey}
          onChange={this.handleInputChange}
        />
        <button onClick={this.signMessage}>Sign</button>
        <div>
          <h3>Signature:</h3>
          <textarea readOnly value={this.state.signature} />
        </div>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to PQC Signer</h2>
          <h3>A simple tool to play with PQC signatures.</h3>
        </div>
        <h2>Press button below to gen keypair.</h2>
        <KeyPairGenerator />
        <SignatureGenerator />
      </div>
    );
  }
}

export default App;
