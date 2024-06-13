import React, { useState } from 'react';

const SignatureVerifier = ({apiBaseUrl, algorithm}) => {
  const [state, setState] = useState({
    message: '',
    publicKey: '',
    signature: '',
    isVerified: ''
  });

  const verifySignature = () => {
    const { message, publicKey, signature } = state;

    fetch(`${apiBaseUrl}/${algorithm}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, publicKey, signature }),
    })
      .then(response => response.json())
      .then(data => {
        setState(prevState => ({ ...prevState, isVerified: data.isVerified }));
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
        name="signature"
        placeholder="Signature to verify"
        value={state.signature}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="publicKey"
        placeholder="Public key"
        value={state.publicKey}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="message"
        placeholder="Original message"
        value={state.message}
        onChange={handleInputChange}
      />
      <button onClick={verifySignature}>Verify</button>
      <div>
        <h3>Verified:</h3>
        <textarea readOnly value={state.isVerified} />
      </div>
    </div>
  );
};

export default SignatureVerifier;