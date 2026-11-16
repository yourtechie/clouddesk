const express = require("express");
const path = require("path");

const app = express();

app.disable("x-powered-by");
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    service: "CloudDesk",
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

app.get("/api/metrics", (req, res) => {
  res.status(200).json({
    region: "eu-west-1",
    activeInstances: 8,
    healthyInstances: 7,
    deploymentsToday: 12,
    availability: "99.98%"
  });
});

app.get("/api/version", (req, res) => {
  res.json({ version: require("./package.json").version });
});

module.exports = app;
