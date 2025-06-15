import { NextFunction, Request, Response } from "express";
import {STATUS_CODE, STATUS} from "../consts/status.const";
import RETURN_MESSAGE from "../consts/return.message.const";

function globalErrorHandler (err:any, req:Request, res:Response, next: NextFunction):any{
    err.statusCode = err.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.status = err.status || STATUS.ERROR;

    console.error('ERROR 💥', err);


    if (err.isOperational) {
      // Lỗi có thể dự đoán (AppError)
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    } 

    //catch validation err
    if(err.details) return res.status(STATUS_CODE.BAD_REQUEST).json({
      status: STATUS.FAIL,
     message: err?.details[0]?.message
    })

    return res.status(500).json({
      status: STATUS.ERROR,
      message: RETURN_MESSAGE.COMMON.SERVER_ERROR
    });
}

export default globalErrorHandler