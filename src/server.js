import express from "express";
import ConnectDB from "./config/connectDB";
import ContactModel from "./models/contact.model";

const app = express();

// Connect to MongoDB;
ConnectDB();

const hostname = "localhost";
const port = 8080;

app.get("/test-db", async (req, res) => {
  try {
    const item = {
      userId: "123123",
      contactId: "2222"
    };
    const contact = await ContactModel.createNew(item);
    res.send(contact);
  } catch (error) {
    console.log(err);
  }
});

app.get("/", (req, res) => {
  res.send("<h1>What's up !</h1>");
});

app.get("/contact", (req, res) => {
  res.send("<p>Contact here</p>");
});

app.get("/about", (req, res) => {
  res.send("<p>What about me ?</p>");
});

app.get("/login", (req, res) => {
  res.send("<p>Login page</p>");
});

app.listen(port, hostname, () => {
  console.log(`Server is running at => ${hostname}:${port}`);
});
