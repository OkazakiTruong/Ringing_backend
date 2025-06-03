import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

export const validate = (schema: ObjectSchema): any => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error: any) {
      return res.status(400).json({
        message: 'Invalid data',
        details: error.details?.map((d: any) => d.message),
      });
    }
  };
};
