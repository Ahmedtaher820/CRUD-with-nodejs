const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require("mongoose");
const cors = require("cors");
const users = require('./routes/user')
app.use(express.json()); //

app.use(express.urlencoded({ extended: true }));
// app.get("/", (req, res) => {
//   // res.send('server is ready');
//   //if i need to send hml file i have to use this code
//   res.sendFile("./views/home.html", { root: __dirname });
// });
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from Nuxt 3
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

//this if i need to use the users routes
app.use('/users',users)
// Enable CORS

mongoose
  .connect(
    "mongodb+srv://et8989784:LtPOtb8Vu69jkpg2@cluster0.f1mss.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`express is ready in port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
