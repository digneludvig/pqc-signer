import React, { useState } from 'react';

const KeyPairGenerator = ({ apiBaseUrl, algorithm }) => {
  const [keyPair, setKeyPair] = useState({ privateKey: '', publicKey: '' });

  const generateKeyPair = () => {
    fetch(`${apiBaseUrl}/${algorithm}/keypair`, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        setKeyPair({
          privateKey: data.privateKey,
          publicKey: data.publicKey
        });
      })
      .catch(error => console.error('Error:', error));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className='flexcontainer-keygen'>
      <h3>Generate keys 🔑</h3>
      <div>
        <button onClick={generateKeyPair}>Generate keypair</button>
      </div>
      <div className="flexcontainer-keypair">
        <div className="flexcontainer-key">
          <h5>Private key</h5>
          <textarea className='copyable' readOnly value={keyPair.privateKey} rows={10} cols={40} />
          <button onClick={() => copyToClipboard(keyPair.privateKey)}>Copy private key to clipboard</button>
        </div>
        <div className="flexcontainer-key">
          <h5>Public key</h5>
          <textarea className='copyable' readOnly value={keyPair.publicKey} rows={10} cols={40} />
          <button onClick={() => copyToClipboard(keyPair.publicKey)}>Copy public key to clipboard</button>
        </div>
      </div>
    </div>
  );
};

export default KeyPairGenerator;