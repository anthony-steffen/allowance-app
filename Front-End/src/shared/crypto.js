import CryptoJS from 'crypto-js';

const SECRET_KEY = 'MySecretKey';

//Function to encrypt the data
const encrypt = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

//Function to decrypt the data
const decrypt = (data) => {
  try {
    const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    // Return the decrypted data as a JSON object
    return decryptedData ? JSON.parse(decryptedData) : null;
  } catch (error) {
    console.error('Erro ao descriptografar:', error);
    return null;
  }
};

export { encrypt, decrypt };

