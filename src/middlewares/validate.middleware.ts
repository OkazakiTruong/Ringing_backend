import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';
import asyncHandler from '../utils/asyncHandler.util';

export const validate = (schema: ObjectSchema): any => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      console.log('🚀 ~ req.body:', req.body);
      await schema.validateAsync(req.body); // Joi sẽ tự throw error
      next(); // Chỉ chạy khi validation thành công
    },
  );
};
