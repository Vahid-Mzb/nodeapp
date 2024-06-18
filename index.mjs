// index.mjs
import express from "express";
import client from "prom-client";

const app = express();

// Create a Registry to register the metrics
const register = new client.Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: "nodeapp",
});

// Enable the collection of default metrics
client.collectDefaultMetrics({ register });

// Define a custom gauge metric
const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method"],
});

// Middleware to count requests
app.use((req, res, next) => {
  httpRequestsTotal.inc({ method: req.method });
  next();
});

// Your existing routes
app.get("/", (req, res) => {
  res.json({ response: "Hello From Vahid" });
});

app.get("/will", (req, res) => {
  res.json({ response: "Hello World" });
});

app.get("/ready", (req, res) => {
  res.json({ response: "Great!, It works!" });
});

// Metrics endpoint
app.get("/metrics", (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(register.metrics());
});

export default app;
