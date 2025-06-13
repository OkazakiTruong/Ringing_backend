import { NextFunction, Request, Response } from "express";

function globalErrorHandler (err:any, req:Request, res:Response, next: NextFunction){
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (err.isOperational) {
      // Lỗi có thể dự đoán (AppError)
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    } else {

      console.error('ERROR 💥', err);
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong!'
      });
    }
}

export default globalErrorHandler