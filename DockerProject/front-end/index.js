const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.post("/submit", async (req, res) => {
  const { email, password } = req.body;
  console.log(" front "+req.body)
  try {
    // Envoyer l'email et le mot de passe au serveur de back-end
    const response = await axios.post("http://back:4021/register", {
      email,
      password,
    });
    console.log(response.data);

    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Une erreur s'est produite dans front end ");
  }
});


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(8051, () => {
  console.log("Le serveur de front-end écoute sur le port 8051");
});
