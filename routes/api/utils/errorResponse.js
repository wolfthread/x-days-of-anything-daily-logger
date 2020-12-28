class ErrorResponse extends Error {
  constructor(message, statusCode) {
    // because Error class has this as param
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;
