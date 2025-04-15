import crypto from "crypto";

// Function to generate SHA-256 signature
// signatureUtils.js
export const generateSignature = (params, shaPhrase) => {
    // 1. Filter out empty/null parameters
    const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== '')
    );

    // 2. Sort parameters alphabetically
    const sortedKeys = Object.keys(filteredParams).sort();

    // 3. Concatenate as key=value pairs
    const concatenated = sortedKeys.map(key => `${key}=${filteredParams[key]}`).join('');

    // 4. Add SHA phrase ONLY at the end
    const stringToSign = concatenated + shaPhrase;

    // 5. Generate SHA256 hash
    return crypto
        .createHash('sha256')
        .update(stringToSign)
        .digest('hex');
};