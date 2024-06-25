import express from "express";
import cors from "cors";
import { StreamChat } from "stream-chat";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
const api_key = "qtkzuesypjfq";
const secret_key =
  "5ayqqfr5vv54eq2ekscy2qhekpq8e6dfsawpwm2arn4utyqprqm7zueu5jqxas6g";

const serverClient = StreamChat.getInstance(api_key, secret_key);

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const userId = uuidv4();
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const token = serverClient.createToken(userId);
    res
      .status(201)
      .json({ token, userId, firstName, lastName, username, hashPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const { users } = await serverClient.queryUsers({ name: username });
      if (users.length === 0) return res.json({ message: "User not found" });
  
      const token = serverClient.createToken(users[0].id);
      const passwordMatch = await bcrypt.compare(
        password,
        users[0].hashPassword
      );
  
      if (passwordMatch) {
        res.json({
          token,
          firstName: users[0].firstName,
          lastName: users[0].lastName,
          username,
          userId: users[0].id,
        });
      }
    } catch (error) {
      res.json(error);
    }
  });
    
app.listen(4000, () => {
  console.log("Listening on port 4000");
});
