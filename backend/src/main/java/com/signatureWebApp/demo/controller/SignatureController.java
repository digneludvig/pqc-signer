package com.signatureWebApp.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.signatureWebApp.demo.services.Dilithium2Service;

import com.signatureWebApp.demo.utils.KeyPairDTO;

import org.springframework.http.ResponseEntity;
import java.util.*;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class SignatureController {
    private final Dilithium2Service dilithium2Service;

    public SignatureController(Dilithium2Service dilithium2Service) {
        this.dilithium2Service = dilithium2Service;
    }

    @GetMapping("/dilithium2/keypair")
    public ResponseEntity<Map<String, String>> generateKeyPair() {
        KeyPairDTO keypair = dilithium2Service.generateKeyPair();
        Map<String, String> response = new HashMap<>();

        response.put("privateKey", keypair.getPrivateKey());
        response.put("publicKey", keypair.getPublicKey());

        return ResponseEntity.ok(response);
    }

    @PostMapping("dilithium2/sign")
    public ResponseEntity<Map<String, String>> signMessage(@RequestBody SignatureController.SignRequest request) {
        String signature = dilithium2Service.signMessage(request.getPrivateKey(), request.getMessage());
        Map<String, String> response = new HashMap<>();
        
        response.put("signature", signature);
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("dilithium2/verify")
    public ResponseEntity<Map<String, String>> verifySignature(@RequestBody SignatureController.VerifyRequest request) {
        Boolean isValid = dilithium2Service.verifySignature(request.getPublicKey(), request.getMessage(), request.getSignature());
        Map<String, String> response = new HashMap<>();
        
        response.put("isVerified", isValid.toString());
    
        return ResponseEntity.ok(response);
    }

    public static class SignRequest {
        private String privateKey;
        private String message;

        public String getPrivateKey() {
            return privateKey;
        }

        public String getMessage() {
            return message;
        }
    }

    public static class VerifyRequest {
        private String publicKey;
        private String message;
        private String signature;

        public String getPublicKey() {
            return publicKey;
        }

        public String getMessage() {
            return message;
        }

        public String getSignature() {
            return signature;
        }
    }
}
