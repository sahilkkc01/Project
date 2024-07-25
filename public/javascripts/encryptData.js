function encryptDataForUrl(data) {
    const secretKey = 'll'; // Replace with your actual secret key
    const encrypted = CryptoJS.AES.encrypt(data, secretKey).toString();
    const encodedEncrypted = encodeURIComponent(encrypted);
    return encodedEncrypted;
}