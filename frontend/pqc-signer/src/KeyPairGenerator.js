import React, { useState } from 'react';

const { getKernel } = require('falcon-sign');

const KeyPairGenerator = ({apiBaseUrl, algorithm}) => {
  const [keyPair, setKeyPair] = useState({ privateKey: '', publicKey: '' });

  const generateFalconKeypair = async() => {
    try {
      let Falcon512 = await getKernel('falcon512_n3_v1');
      let keypair = Falcon512.genkey();
      setKeyPair({
        privateKey: keypair.sk,
        publicKey: keypair.pk,
      });
    } catch (error) {
      console.error('Error generating Falcon keypair: ', error);
    }
  }

  const generateKeyPair = () => {
    if (algorithm === 'falcon512') {
      generateFalconKeypair();
    } else {
      fetch(`${apiBaseUrl}/${algorithm}/keypair`, {method: 'GET'})
      .then(response => response.json())
      .then(data => {
        setKeyPair({
          privateKey: data.privateKey,
          publicKey: data.publicKey
        });
      })
      .catch(error => console.error('Error:', error));
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className='flexcontainer-keygen'>
      <h3>Generate keys 🔑</h3>
      <div>
        <button onClick={generateKeyPair}>Generate keypair</button>
      </div>
      <div className="flexcontainer-keypair">
        <div className="flexcontainer-key">
          <h5>Private key</h5>
          <textarea className='copyable' readOnly value={keyPair.privateKey} rows={10} cols={40}/>
          <button onClick={() => copyToClipboard(keyPair.privateKey)}>Copy private key clipboard</button>
        </div>
        <div className="flexcontainer-key">
          <h5>Public key</h5>
          <textarea className='copyable' readOnly value={keyPair.publicKey} rows={10} cols={40}/>
          <button onClick={() => copyToClipboard(keyPair.publicKey)}>Copy public key clipboard</button>
        </div>
      </div>
    </div>
  );
};

export default KeyPairGenerator;