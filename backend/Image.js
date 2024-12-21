/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

// const image = require('../src/Assets/Dell Inspiron 15 Laptop.png')

/**
 * Converts an image file to a Base64 string.
 * @param {string} imagePath - The path to the image file.
 * @returns {string} - The Base64 encoded image string.
 */
function convertImageToBase64(imagePath) {
    try {
        // Read the image file
        const imageData = fs.readFileSync(imagePath);

        // Convert the image data to a Base64 string
        return imageData.toString('base64');
    } catch (err) {
        console.error('Error converting image to Base64:', err);
        return null;
    }
}

// Example usage
const imagePath = path.join(__dirname, '../src/Assets/Sony.png');  // Replace with the correct image path
const base64Image = convertImageToBase64(imagePath);

console.log(base64Image);
