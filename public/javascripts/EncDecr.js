function encryptDataForUrl(data) {
    const secretKey = 'll'; // Replace with your actual secret key
    const encrypted = CryptoJS.AES.encrypt(data, secretKey).toString();
    const encodedEncrypted = encodeURIComponent(encrypted);
    return encodedEncrypted;
  }

  function decryptData(encryptedData, secretKey) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
  
      