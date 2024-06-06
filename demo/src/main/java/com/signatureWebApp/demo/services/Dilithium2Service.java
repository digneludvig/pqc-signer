package com.signatureWebApp.demo.services;

import java.security.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.signatureWebApp.demo.utils.KeyPairDTO;

import net.thiim.dilithium.interfaces.DilithiumParameterSpec;
import net.thiim.dilithium.provider.*;
import net.thiim.dilithium.provider.DilithiumProvider;
import net.thiim.dilithium.impl.PolyVec;
import net.thiim.dilithium.impl.Poly;
import java.util.Base64;


@Service
public class Dilithium2Service {
    DilithiumProvider dp;

    public Dilithium2Service() {
        dp = new DilithiumProvider();
        Security.addProvider(dp);

        for (Provider provider : Security.getProviders()) {
            System.out.println(provider.getName());
        }
        // System.out.println(dp.getInfo());
        System.out.println("Successfully generated key pair.");
    }

    public KeyPairDTO generateKeyPair() {
        try {
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("Dilithium");
            System.out.println("Successfully got instance of Dilithium provider.");
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
        return "hi";
    }
}