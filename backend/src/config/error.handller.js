export function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    
    // Custom thrown errors 
    if (err.statusCode) {
        // logger.warn(`Custom Error | Status: ${err.statusCode} | Message: ${err.message}`);
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }
    // logger.error(`Unhandled Error: ${err.message}`, err.stack || err);

    if (err.name === "ValidationError" || err.message?.includes("required")) {
        return res.status(400).json({
            success: false,
            message: err.message || "Validation failed"
        });
    }

    // Fallback for other errors
    return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
}
