import dotenv from "dotenv";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);
  const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

  app.use("/api", express.json({ limit: "1mb" }), async (req, res) => {
    try {
      const response = await fetch(`${BACKEND_URL}${req.originalUrl}`, {
        method: req.method,
        headers: {
          "content-type": "application/json",
        },
        body: ["GET", "HEAD"].includes(req.method)
          ? undefined
          : JSON.stringify(req.body ?? {}),
      });

      const contentType = response.headers.get("content-type") || "";
      res.status(response.status);

      if (contentType.includes("application/json")) {
        res.json(await response.json());
      } else {
        res.send(await response.text());
      }
    } catch (error) {
      console.error("Backend proxy error:", error);
      res.status(502).json({
        error: "FastAPI backend is not reachable.",
        backendUrl: BACKEND_URL,
      });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Frontend running on http://localhost:${PORT}`);
    console.log(`Proxying API requests to ${BACKEND_URL}`);
  });
}

startServer();
