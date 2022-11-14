const statusMessage = {
  200: 'Done',
  201: 'Created',
  400: 'Invalid format',
  500: 'Internal error'
};

exports.success = (req, res, message, data, status) => {
  let statusMsg = message;
  const statusCode = status || 200;

  if (!message) {
    statusMsg = statusMessage[statusCode];
  }

  res.status(statusCode).json({
    data,
    message: statusMsg,
    status: statusCode,
    success: true
  });
};

exports.error = (req, res, error, status, details) => {
  const statusCode = status || 500;
  console.log({ errorDetails: details, error, status });
  res.status(statusCode).json({
    ...error,
    status: statusCode,
    success: false
  });
};
