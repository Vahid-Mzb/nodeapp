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

// Define custom metrics
const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "code"],
});

const httpRequestDurationMs = new client.Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in ms",
  labelNames: ["method", "route", "code"],
  buckets: [50, 100, 200, 300, 400, 500, 1000], // Define suitable buckets for your needs
});

// Middleware to count requests and measure response times
app.use((req, res, next) => {
  const start = process.hrtime();

  res.on("finish", () => {
    const durationInMilliseconds = getDurationInMilliseconds(start);
    // Safely access route path or use a fallback
    const routePath =
      req.route && req.route.path ? req.route.path : "unknown_route";
    httpRequestDurationMs.observe(
      { method: req.method, route: routePath, code: res.statusCode },
      durationInMilliseconds
    );
    httpRequestsTotal.inc({
      method: req.method,
      route: routePath,
      code: res.statusCode,
    });
  });

  next();
});

function getDurationInMilliseconds(start) {
  const [seconds, nanoseconds] = process.hrtime(start);
  return seconds * 1000 + nanoseconds / 1e6;
}

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

app.get("/metrics", async (req, res) => {
  try {
    res.set("Content-Type", register.contentType);
    const metrics = await register.metrics();
    res.end(metrics);
  } catch (error) {
    res.status(500).end(`Error getting metrics: ${error}`);
  }
});

export default app;
