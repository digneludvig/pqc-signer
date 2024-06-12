package com.signatureWebApp.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.signatureWebApp.demo.services.Dilithium2Service;

import java.security.KeyPair;

import com.signatureWebApp.demo.utils.KeyPairDTO;

@RestController
public class SignatureController {
    private final Dilithium2Service dilithium2Service;

    public SignatureController(Dilithium2Service dilithium2Service) {
        this.dilithium2Service = dilithium2Service;
    }

    @GetMapping("/dilithium2/keypair")
    public KeyPairDTO generateKeyPair() {
        // This will initialize the Dilithium2Service and print the security providers
        return dilithium2Service.generateKeyPair();
    }

    @PostMapping("dilithium2/sign")
    public String signMessage(@RequestBody SignatureController.SignRequest request) {
        return dilithium2Service.signMessage(request.getPrivateKey(), request.getMessage());
    }

    @PostMapping("dilithium2/verify")
    public Boolean verifySignature(@RequestBody SignatureController.VerifyRequest request) {
        return dilithium2Service.verifySignature(request.getPublicKey(), request.getMessage(), request.getSignature());
    }

    public static class SignRequest {
        private String privateKey;
        private String message;

        public String getPrivateKey() {
            return privateKey;
        }

        public void setPrivateKey(String privateKey) {
            this.privateKey = privateKey;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

    public static class VerifyRequest {
        private String publicKey;
        private String message;
        private String signature;

        public String getPublicKey() {
            return publicKey;
        }

        public void setPublicKey(String publicKey) {
            this.publicKey = publicKey;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public String getSignature() {
            return signature;
        }

        public void setSignature(String signature) {
            this.signature = signature;
        }
    }
}
