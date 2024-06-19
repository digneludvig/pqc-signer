import React, { useState } from 'react';

const SignatureVerifier = ({ apiBaseUrl, algorithm }) => {
  const [state, setState] = useState({
    message: '',
    publicKey: '',
    signature: '',
    isVerified: '',
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
        setState(prevState => ({
          ...prevState,
          isVerified: data.isVerified,
        }));
      })
      .catch(error => console.error('Error:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div className='flexcontainer-verify'>
      <h3>Verify signature ☑️</h3>
      <div className='flexcontainer-verify-input'>
        <div>
          <h5>Signature to verify</h5>
          <textarea
            name="signature"
            placeholder="Signature"
            value={state.signature}
            onChange={handleInputChange}
            rows={5}
            cols={20}
          />
        </div>
        <div>
          <h5>Public key</h5>
          <textarea
            name="publicKey"
            placeholder="Public key"
            value={state.publicKey}
            onChange={handleInputChange}
            rows={5}
            cols={20}
          />
        </div>
        <div>
          <h5>Original message</h5>
          <textarea
            name="message"
            placeholder="Original message"
            value={state.message}
            onChange={handleInputChange}
            rows={5}
            cols={20}
          />
        </div>
      </div>
      <div className='verify-button'>
        <button onClick={verifySignature}>Verify</button>
      </div>
      <div>
        <h5>Verified (true / false)</h5>
        <div className='verification-result'>
          {state.isVerified !== '' && (
            <div className="animate">
              {state.isVerified === 'true' ? '✅' : '❌'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignatureVerifier;