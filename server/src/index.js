import { createJamServer } from "./app.js";
import { loadConfig } from "./config.js";

const config = loadConfig();
const jam = createJamServer(config);

jam.server.listen(config.port, "0.0.0.0", () => {
  console.log(
    `[jam] listening on port ${config.port} (origins: ${config.allowedOrigins.join(", ")})`
  );
});

const shutdown = () => {
  console.log("[jam] shutting down");
  void jam.close().then(() => process.exit(0));
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);