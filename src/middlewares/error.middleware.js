const errorMiddleware = (err, _req, res, _next) => {
    console.error('Error middleware', err);
    res.status(500).json({ message: err.message });
};

module.exports = errorMiddleware;