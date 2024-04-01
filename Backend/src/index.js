import express from "express";
import fileUpload from "express-fileupload";
import { prisma } from "../prisma.config.js";
import userRouter from "./controller/user.js";
import logRouter from "./controller/log.js";
import uploadRouter from "./controller/upload.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));

app.use("/upload", uploadRouter);
app.use("/user", userRouter);
app.use("/log", logRouter);

app.post("/", (req, res) => {
  console.log(req.files);
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
 *   Post log:
 *        We send the s3 link, bounding box, animal id and user id to the request
 *   Get log:
 *
 * Task :
 *   Get req:
 *        Pull the data based on the user, getting the logs
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
