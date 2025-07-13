import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler.util';
import AppError from '../utils/appError.util';
import RETURN_MESSAGE from '../consts/return.message.const';
import { STATUS_CODE } from '../consts/status.const';
import jwtService from '../services/jwt.service';

export const jwtMiddleware = asyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];

    if (!accessToken)
      return next(
        new AppError(
          RETURN_MESSAGE.AUTH.AUTHENTICATION_FAIL,
          STATUS_CODE.UNAUTHORIZED,
        ),
      );

    const decodeAccess = jwtService.verifyToken(accessToken);
    if (!decodeAccess)
      return next(
        new AppError(
          RETURN_MESSAGE.AUTH.AUTHENTICATION_FAIL,
          STATUS_CODE.UNAUTHORIZED,
        ),
      );

    req.body.userData = decodeAccess;
    return next();
  },
);
