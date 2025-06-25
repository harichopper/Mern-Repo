const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const Contact = require("./models/Contact");

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB error:", err));

// POST form
app.post("/contact", async (req, res) => {
  const { Name, email, message } = req.body;
  try {
    await Contact.create({ name: Name, email, message });
    res.send("<h2>Thanks for contacting us!</h2><a href='/'>Back</a>");
  } catch (err) {
    res.status(500).send("Error saving contact.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
