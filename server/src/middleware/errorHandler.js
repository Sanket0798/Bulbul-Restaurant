const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500
  console.error(`[ERROR] ${err.message}`)
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}

module.exports = errorHandler
