function errorHandler(err, req, res, next) {
  console.error('Error:', err.message);

  if (res.headersSent) {
    return next(err);
  }

  let status = err.status;
  if (status !== 400 && status !== 404 && status !== 200 && status !== 204) {
    status = 400; 
  }

  let defaultMessage = 'Something went wrong';
  if (status === 400) defaultMessage = 'Bad Request';
  else if (status === 404) defaultMessage = 'Not Found';
  else if (status === 200) defaultMessage = 'OK';
  else if (status === 204) defaultMessage = 'No Content';

  res.status(status).json({
    message: err.message || defaultMessage,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}

module.exports = { errorHandler };
