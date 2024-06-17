import React, { useState } from 'react';

const SignatureGenerator = ({ apiBaseUrl, algorithm }) => {
  const [state, setState] = useState({
    message: '',
    privateKey: '',
    signature: ''
  });

  const signMessage = () => {
    const { message, privateKey } = state;

    fetch(`${apiBaseUrl}/${algorithm}/sign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, privateKey }),
    })
      .then(response => response.json())
      .then(data => {
        setState(prevState => ({ ...prevState, signature: data.signature }));
      })
      .catch(error => console.error('Error:', error));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="flexcontainer-sign">
      <h3>Generate signature ✍️</h3>
      <div className="flexcontainer-sign-input">
        <div>
          <h5>Message to sign</h5>
          <textarea
            name="message"
            placeholder="I assure you, I am who I say I am..."
            value={state.message}
            onChange={handleInputChange}
            rows={5}
            cols={30}
          />
        </div>
        <div>
          <h5>Private key</h5>
          <textarea
            name="privateKey"
            placeholder="Private key"
            value={state.privateKey}
            onChange={handleInputChange}
            rows={5}
            cols={30}
          />
        </div>
      </div>
      <div className='sign-button'>
        <button name="sign" onClick={signMessage}>Sign</button>
      </div>

      <div className="flexcontainer-sign-output">
        <h5>Signature</h5>
        <textarea className='copyable' readOnly value={state.signature} rows={5} cols={65}/>
        <button onClick={() => copyToClipboard(state.signature)}>Copy signature to clipboard</button>
      </div>
    </div>
  );
};

export default SignatureGenerator;