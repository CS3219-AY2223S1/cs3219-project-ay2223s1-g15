import express from "express";
import cors from "cors";
import { createServer } from "http";
import { createNewQuestion, getRandomQuestion } from "./controller/question-controller.js";

const app = express();
const PORT = process.env.PORT || 8004;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

app.get("/", getRandomQuestion);
app.post("/", createNewQuestion);

export const httpServer = createServer(app);

httpServer.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
