const ErrorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // CASTING ERROR
  if (err.name === "CastError") {
    const message = `Invalid ${err.path}: ${err.value}`;
    return res.status(400).json({ success: false, message });
  }

  // INVALID JSON
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid JSON payload" });
  }

  // DEFAULT
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

module.exports = ErrorMiddleware;
