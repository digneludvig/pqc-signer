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
    public String signMessage(@RequestBody SignatureController.signRequest request) {
        return dilithium2Service.signMessage(request.getPrivateKey(), request.getMessage());
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
}
