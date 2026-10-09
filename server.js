const express = require("express");
const path = require("node:path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const services = [
  { id: 1, name: "frontend-web", environment: "Production", status: "Healthy", version: "v1.8.2", uptime: "99.98%", region: "ap-south-1" },
  { id: 2, name: "orders-api", environment: "Production", status: "Healthy", version: "v2.4.0", uptime: "99.95%", region: "ap-south-1" },
  { id: 3, name: "payments-worker", environment: "Staging", status: "Degraded", version: "v0.9.7", uptime: "98.70%", region: "ap-south-1" },
  { id: 4, name: "notifications", environment: "Development", status: "Healthy", version: "v1.2.1", uptime: "99.90%", region: "ap-south-1" }
];

const deployments = [
  { id: "DEP-1042", service: "frontend-web", version: "v1.8.2", environment: "Production", status: "Success", time: "Today, 09:42 AM", author: "release-bot" },
  { id: "DEP-1041", service: "orders-api", version: "v2.4.0", environment: "Production", status: "Success", time: "Today, 08:17 AM", author: "release-bot" },
  { id: "DEP-1040", service: "payments-worker", version: "v0.9.7", environment: "Staging", status: "Failed", time: "Yesterday, 06:31 PM", author: "dev-team" },
  { id: "DEP-1039", service: "notifications", version: "v1.2.1", environment: "Development", status: "Success", time: "Yesterday, 04:12 PM", author: "release-bot" }
];

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    app: "OpsPilot API",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/version", (_req, res) => {
  res.json({
    application: "OpsPilot",
    version: "1.0.0"
  });
});

app.get("/api/services", (_req, res) => res.json(services));

app.get("/api/deployments", (_req, res) => res.json(deployments));

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ error: "API route not found" });
  }

  res.sendFile(path.join(__dirname, "public", "index.html"), (err) => {
    if (err) next(err);
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`OpsPilot is running on port ${PORT}`);
});