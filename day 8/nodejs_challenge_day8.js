const express = require("express");
const app = express();
const port = 3000;

function positiveIntegerHandler(req, res) {
  const number = parseInt(req.query.number);

  if (number < 0) {
    res.status(400).json(`Failure: ${number} is a negative integer.`);
  } else if (number >= 0) {
    res.status(200).json(`Success: ${number} is a positive integer.`);
  } else {
    res
      .status(400)
      .json(
        `Failure: The number is not an integer. Please enter a valid number.`
      );
  }
}

app.get("/positive", positiveIntegerHandler, (req, res) => {
  const number = parseInt(req.query.number);
  res.json({ message: `${number} is a positive integer.` });
});

app.listen(port, () => {
  console.log(`Server is listening at port: ${port}`);
});
