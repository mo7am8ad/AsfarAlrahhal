import crypto from "crypto";

// Function to generate SHA-256 signature
export const generateSignature = (params, shaPhrase) => {
    const sortedKeys = Object.keys(params).sort();
    let signatureString = shaPhrase; // Start with the SHA request phrase
    sortedKeys.forEach((key) => {
        signatureString += `${key}=${params[key]}`;
    });
    signatureString += shaPhrase; // End with SHA phrase
    return crypto.createHash("sha256").update(signatureString).digest("hex");
};