import express from "express";
import { createUser, getUserByEmail } from "../model/user.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("get req");
});

router.post("/", async (req, res) => {
  const data = req.body;
  const { email, username } = data;

  if (!email || !username) {
    return res.status(400).send("Invalid Body");
  }

  let user = await getUserByEmail(email);

  if (user) {
    return res.status(200).send("User already in DB");
  }

  user = await createUser(data);

  res.status(200).json(user);
});

export default router;
