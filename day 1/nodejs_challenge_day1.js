const fs = require("fs");

function readFileContent(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        console.log(`Error reading file: ${err.message}`);
      } else {
        console.error(`Error reading file: ${err.message}`);
      }
    } else {
      console.log(`File Content:\n${data}`);
    }
  });
}

// Test Cases
readFileContent("test-files/file1.txt");
readFileContent("test-files/empty-file.txt");
readFileContent("test-files/nonexistent-file.txt");
