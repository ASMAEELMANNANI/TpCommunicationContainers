const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://mongo:27017/myapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Databse Connected Successfully!!");    
}).catch(err => {
  console.log('Could not connect to the database', err);
  process.exit();
});

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        },
        password: {
        type: String,
        required: true,
        },
        });

  const UserModel = mongoose.model("User", UserSchema);

app.post("/register", async (req, res) => {


const { email, password } = req.body;

console.log(" back "+req.body)
try {
// Enregistrer l'utilisateur dans la base de données
const user = new UserModel({ email, password });
await user.save();
res.send("L'utilisateur a été enregistré avec succès");
} catch (error) {
console.error(error);
res.status(500).send("Une erreur s'est produite");
}
});

app.get('/getAll', async (req, res) => {
  try{
      const data = await UserModel.find();
      console.log(data)
      res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})
app.listen(4021, () => {
console.log("Le serveur de back-end écoute sur le port 4021");
});


