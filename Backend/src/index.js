import express from "express";
import { prisma } from "../prisma.config.js";
import userRouter from "./controller/user.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({});
  console.log(users);
  res.json(users);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/**
 *
 *
 *
 * Task:
 *   Sign up: frontend sends the data and we sign the user up into the db
 *            Put all 5 animals into their array
 * Task:
 *   Post logs:
 *        We send the s3 link, bounding box, animal id and user id to the request
 * Task :
 *   Get req:
 *        Pull the data based of the user, getting the logs
 * Task:
 *   Update phone number and threat level
 *
 * Task:
 *   Make an api route so we can store the image in the s3 bucket and return the link.
 *
 * Task:
 *
 *
 *
 */
