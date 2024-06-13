import React, { useState } from 'react';

const SignatureGenerator = ({apiBaseUrl, algorithm}) => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <input
        type="text"
        name="message"
        placeholder="Message to sign"
        value={state.message}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="privateKey"
        placeholder="Private key"
        value={state.privateKey}
        onChange={handleInputChange}
      />
      <button onClick={signMessage}>Sign</button>
      <div>
        <h3>Signature:</h3>
        <textarea readOnly value={state.signature} />
      </div>
    </div>
  );
};

export default SignatureGenerator;