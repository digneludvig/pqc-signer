import React, { useState } from 'react';

const KeyPairGenerator = ({apiBaseUrl, algorithm}) => {
  const [keyPair, setKeyPair] = useState({ privateKey: '', publicKey: '' });

  const generateKeyPair = () => {
    fetch(`${apiBaseUrl}/${algorithm}/keypair`, {method: 'GET'})
      .then(response => response.json())
      .then(data => {
        setKeyPair({
          privateKey: data.privateKey,
          publicKey: data.publicKey
        });
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <button onClick={generateKeyPair}>Generate Key Pair</button>
      <div>
        <h3>Private Key:</h3>
        <textarea readOnly value={keyPair.privateKey} />
      </div>
      <div>
        <h3>Public Key:</h3>
        <textarea readOnly value={keyPair.publicKey} />
      </div>
    </div>
  );
};

export default KeyPairGenerator;