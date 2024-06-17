import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.json({ response: "Hello From Vahid" });
});

app.get("/will", (req, res) => {
  res.json({ response: "Hello World" });
});

app.get("/ready", (req, res) => {
  res.json({ response: "Great!, It works!" });
});

app.listen(process.env.PORT || 3000);

export default app;
