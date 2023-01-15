const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "042697b403e5f89ac81b4380fd13a942f8023ed41d72e899a1ebcc7cacdc95fcacc89823b222bbc7a22e35aac12a323436bae9702f76efa2d98142e27199cea6f0": 100, //a
  "043367f498a1675a836dbfe652c93265b3266a7d854482963f66ef0c23d45248b1322a57ea12367e37c2d2980fb8dd88348494c39bb2e1daede7525f09be12fc41": 50,  //b
  "04a5820bcef21ca3fedd71f0b7345963eda8e279165466814582c40e73f24a2c37653838e0c72d27fc5a9b342f5cd9b9366a0249ea934139afa6d392b9dbad81f4": 75,  //c
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
