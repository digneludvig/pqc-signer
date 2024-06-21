package com.signatureWebApp.demo.utils;

public class KeyPairDTO {
    private String publicKey;
    private String privateKey;

    // getters and setters
    public String getPublicKey() {
        return publicKey;
    }

    public void setPublicKey(String publicKey) {
        this.publicKey = publicKey;
    }

    public String getPrivateKey() {
        return privateKey;
    }

    public void setPrivateKey(String privateKey) {
        this.privateKey = privateKey;
    }
}