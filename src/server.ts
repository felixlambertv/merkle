import app from "./config/App.config";
import { config } from "./config/Vars.config";

const startServer = async () => {
  try {
    const server = app.listen(config.port, () => {
      console.log(`server is running at ${config.host}:${config.port}`);
    });

    const gracefulShutdown = async () => {
      try {
        console.log("Gracefully shutting down...");

        // Close the Express server
        server.close(async () => {
          console.log("Closed out remaining connections.");
        });
      } catch (error) {
        console.error("Error during shutdown:", error);
        process.exit(1);
      }
    };

    // Listen for termination signals
    process.on("SIGTERM", gracefulShutdown); // on "terminate"
    process.on("SIGINT", gracefulShutdown);
  } catch (error) {
    console.error("Error:", error);
  }
};
startServer();
