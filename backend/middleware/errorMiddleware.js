// const notFound = (req, res, next) => {
//   const error = new Error(`לא נמצא - ${req.originalUrl}`);
//   res.status(404);
//   next(error);
// };

// const errorHandler = (err, req, res, next) => {
//   let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//   let messgae = err.message;
// };

// if (err.name === "CastError" && err.kind === "ObjectId") {
//   message: `משאב לא נמצא`;
//   statusCode = 404;
// }
// res.status(statusCode).json({
//   message,
//   stack: process.env.NODE_ENV === "production" ? "##" : err.stack,
// });

// export { notFound, errorHandler };

const notFound = (req, res, next) => {
  const error = new Error(`לא נמצא  - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // NOTE: checking for invalid ObjectId moved to it's own middleware
  // See README for further info.

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
