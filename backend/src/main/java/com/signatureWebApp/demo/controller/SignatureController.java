package com.signatureWebApp.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.signatureWebApp.demo.services.Dilithium.*;
import com.signatureWebApp.demo.utils.KeyPairDTO;

import org.springframework.http.ResponseEntity;
import java.util.*;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class SignatureController {
    private final Dilithium2Service dilithium2Service;
    private final Dilithium3Service dilithium3Service;
    private final Dilithium5Service dilithium5Service;

    public SignatureController(Dilithium2Service dilithium2Service, 
                               Dilithium3Service dilithium3Service,
                               Dilithium5Service dilithium5Service) {
        this.dilithium2Service = dilithium2Service;
        this.dilithium3Service = dilithium3Service;
        this.dilithium5Service = dilithium5Service;
    }

    @GetMapping("/dilithium2/keypair")
    public ResponseEntity<Map<String, String>> generateKeyPairDilithium2() {
        KeyPairDTO keypair = dilithium2Service.generateKeyPair();
        Map<String, String> response = new HashMap<>();

        response.put("privateKey", keypair.getPrivateKey());
        response.put("publicKey", keypair.getPublicKey());

        return ResponseEntity.ok(response);
    }

    @PostMapping("dilithium2/sign")
    public ResponseEntity<Map<String, String>> signMessageDilithium2(@RequestBody SignatureController.SignRequest request) {
        String signature = dilithium2Service.signMessage(request.getPrivateKey(), request.getMessage());
        Map<String, String> response = new HashMap<>();
        
        response.put("signature", signature);
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("dilithium2/verify")
    public ResponseEntity<Map<String, String>> verifySignatureDilithium2(@RequestBody SignatureController.VerifyRequest request) {
        Boolean isValid = dilithium2Service.verifySignature(request.getPublicKey(), request.getMessage(), request.getSignature());
        Map<String, String> response = new HashMap<>();
        
        response.put("isVerified", isValid.toString());
    
        return ResponseEntity.ok(response);
    }

    @GetMapping("/dilithium3/keypair")
    public ResponseEntity<Map<String, String>> generateKeyPairDilithium3() {
        KeyPairDTO keypair = dilithium3Service.generateKeyPair();
        Map<String, String> response = new HashMap<>();

        response.put("privateKey", keypair.getPrivateKey());
        response.put("publicKey", keypair.getPublicKey());

        return ResponseEntity.ok(response);
    }

    @PostMapping("dilithium3/sign")
    public ResponseEntity<Map<String, String>> signMessageDilithium3(@RequestBody SignatureController.SignRequest request) {
        String signature = dilithium3Service.signMessage(request.getPrivateKey(), request.getMessage());
        Map<String, String> response = new HashMap<>();
        
        response.put("signature", signature);
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("dilithium3/verify")
    public ResponseEntity<Map<String, String>> verifySignatureDilithium3(@RequestBody SignatureController.VerifyRequest request) {
        Boolean isValid = dilithium3Service.verifySignature(request.getPublicKey(), request.getMessage(), request.getSignature());
        Map<String, String> response = new HashMap<>();
        
        response.put("isVerified", isValid.toString());
    
        return ResponseEntity.ok(response);
    }

    @GetMapping("/dilithium5/keypair")
    public ResponseEntity<Map<String, String>> generateKeyPairDilithium5() {
        KeyPairDTO keypair = dilithium5Service.generateKeyPair();
        Map<String, String> response = new HashMap<>();

        response.put("privateKey", keypair.getPrivateKey());
        response.put("publicKey", keypair.getPublicKey());

        return ResponseEntity.ok(response);
    }

    @PostMapping("dilithium5/sign")
    public ResponseEntity<Map<String, String>> signMessageDilithium5(@RequestBody SignatureController.SignRequest request) {
        String signature = dilithium5Service.signMessage(request.getPrivateKey(), request.getMessage());
        Map<String, String> response = new HashMap<>();
        
        response.put("signature", signature);
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("dilithium5/verify")
    public ResponseEntity<Map<String, String>> verifySignatureDilithium5(@RequestBody SignatureController.VerifyRequest request) {
        Boolean isValid = dilithium5Service.verifySignature(request.getPublicKey(), request.getMessage(), request.getSignature());
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
