const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Contact = require("./models/Contact");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection
mongoose.connect("mongodb+srv://haricdonh:hari5678@haricluster.0tsnw.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error(err));

// Route to handle contact form
app.post("/contact", async (req, res) => {
  const { Name, email, message } = req.body;

  try {
    const contactEntry = new Contact({ name: Name, email, message });
    await contactEntry.save();
    res.send("<h2>Thanks for contacting us!</h2><a href='/'>Back</a>");
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
