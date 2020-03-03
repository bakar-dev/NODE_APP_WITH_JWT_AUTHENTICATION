const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
//import routes
const authRoutes = require("./routes/auth");
const applicationRoutes = require("./routes/application");

dotenv.config();

//connect to db
mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB!!")
);

//middlewares
app.use(express.json());

app.use("/api/user", authRoutes);
app.use("/api/applications", applicationRoutes);

app.listen(5000, () => console.log("Server is Up and Running..."));
