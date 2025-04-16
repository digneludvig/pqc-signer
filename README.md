# pqc-signer

The idea behind this project is to create a simple UI for people to play with post-quantum cryptography algorithms such as Dilitihum and Falcon. It's not finished, but has support for Dilithium security levels 2, 3, and 5.

Gif of what it looks like and how it works:
![](https://github.com/digneludvig/pqc-signer/blob/main/pqcsigner_demo.gif)

## Setup Steps

### Clone the repository

```bash
git clone https://github.com/digneludvig/pqc-signer.git
cd pqc-signer
```
### Install dependencies and run
Install the Dilithium submodule
```bash
cd backend-java/libs/dilithium-java
mvn install
```
then go into root of backend directory and install dependencies
```bash
cd ../..
mvn install
```
Run backend from root of backend directory
```bash
mvn spring-boot:run
```

To run frontend, navigate to /pqc-signer/frontend/pqc-signer/ and run
```bash
npm install
npm start```
