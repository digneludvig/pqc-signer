package com.signatureWebApp.demo.services;

import java.security.*;
import java.security.spec.InvalidKeySpecException;

import org.springframework.stereotype.Service;

import com.signatureWebApp.demo.utils.KeyPairDTO;

import net.thiim.dilithium.interfaces.DilithiumParameterSpec;
import net.thiim.dilithium.interfaces.DilithiumPrivateKeySpec;
import net.thiim.dilithium.interfaces.DilithiumPublicKeySpec;
import net.thiim.dilithium.provider.DilithiumProvider;
import java.util.Base64;


@Service
public class Dilithium2Service {
    DilithiumProvider dp;

    public Dilithium2Service() {
        dp = new DilithiumProvider();
        Security.addProvider(dp);
    }

    public KeyPairDTO generateKeyPair() {
        try {
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("Dilithium");
            keyPairGenerator.initialize(DilithiumParameterSpec.LEVEL2, new SecureRandom());
            KeyPair kp = keyPairGenerator.generateKeyPair();

            KeyPairDTO keyPairDTO = new KeyPairDTO();
            keyPairDTO.setPublicKey(Base64.getEncoder().encodeToString(kp.getPublic().getEncoded()));
            keyPairDTO.setPrivateKey(Base64.getEncoder().encodeToString(kp.getPrivate().getEncoded()));

            return keyPairDTO;
        } catch (NoSuchAlgorithmException | InvalidAlgorithmParameterException e) {
            e.printStackTrace();
            return null;
        }
    }

    public String signMessage(String privateKey, String message) {
        try {
            byte[] privateKeyBytes = Base64.getDecoder().decode(privateKey);
            KeyFactory keyFactory = KeyFactory.getInstance("Dilithium");
            PrivateKey privateKeyForSign = keyFactory.generatePrivate(new DilithiumPrivateKeySpec(DilithiumParameterSpec.LEVEL2, privateKeyBytes));
            
            Signature sig = Signature.getInstance("Dilithium");
            sig.initSign(privateKeyForSign);
            sig.update(message.getBytes());
            byte[] signature = sig.sign();
            return Base64.getEncoder().encodeToString(signature);
        } catch (NoSuchAlgorithmException | InvalidKeySpecException | SignatureException | InvalidKeyException e) {
            e.printStackTrace();
            return "Error signing message.";
        }
    }

    public Boolean verifySignature(String publicKey, String message, String signature) {
        try {
            byte[] publicKeyBytes = Base64.getDecoder().decode(publicKey);
            byte[] signatureBytes = Base64.getDecoder().decode(signature);
            KeyFactory keyFactory = KeyFactory.getInstance("Dilithium");
            PublicKey publicKeyForVerify = keyFactory.generatePublic(new DilithiumPublicKeySpec(DilithiumParameterSpec.LEVEL2, publicKeyBytes));
            
            Signature sig = Signature.getInstance("Dilithium");
            sig.initVerify(publicKeyForVerify);
            sig.update(message.getBytes());
            return sig.verify(signatureBytes);
        } catch (NoSuchAlgorithmException | InvalidKeySpecException | SignatureException | InvalidKeyException e) {
            e.printStackTrace();
            return false;
        }
    }
}