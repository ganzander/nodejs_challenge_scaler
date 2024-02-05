const path = require("path");

function checkFileExtension(filePath, expectedExtension) {
  const actualExtension = path.extname(filePath).toLowerCase();
  const isExtensionMatch = actualExtension === expectedExtension.toLowerCase();
  if (isExtensionMatch) {
    console.log(`File has the expected extension: ${expectedExtension}`);
  } else {
    console.log(
      `File does not have the expected extension. Expected: ${expectedExtension}, Actual: ${actualExtension}`
    );
  }
}

checkFileExtension("test-files/file1.txt", ".txt");
checkFileExtension("test-files/image.png", ".jpg");
