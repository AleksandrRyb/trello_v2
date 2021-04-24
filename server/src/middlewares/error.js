import logger from "log-level";

//Middleware that will help us catch generic  express-related errors
function errorMiddleware(error, req, res, next) {
  if (res.headerSent) {
    next(error);
  } else {
    logger.error(error);
    res.status(error.statusCode || 500);
    res.json({
      message: error.message,
      ...(process.env.NODE_ENV === "production"
        ? null
        : { stack: error.stack }),
    });
  }
}

//This closes the server in the event if an error so that our requests do not hang
function setupCloseOnExit(server) {
  async function exitHandler(options = {}) {
    await server
      .close()
      .then(() => {
        logger.info("Server successfully closed");
      })
      .catch((error) => {
        logger.warning("Something went wrong closing the server", error.stack);
      });

    if (options.exit) process.exit();
  }

  //Do something when server is closing
  process.on("exit", exitHandler);

  //Catches ctrc+c event
  process.on("SIGINT", exitHandler.bind(null, { exit: true }));
  // Catches "kill pid" (for example: nodemon restart)
  process.on("SIGUSR1", exitHandler.bind(null, { exit: true }));
  process.on("SIGUSR2", exitHandler.bind(null, { exit: true }));
  // Catches uncaught exceptions
  process.on("uncaughtException", exitHandler.bind(null, { exit: true }));
}

export { errorMiddleware, setupCloseOnExit };
