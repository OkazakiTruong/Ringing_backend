import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler.util';
import {
  ILoginUser,
  IRegisterUser,
  IUserData,
} from '../interfaces/user.interface';
import userService from '../services/user.service';
import AppError from '../utils/appError.util';
import { STATUS_CODE } from '../consts/status.const';
import RETURN_MESSAGE from '../consts/return.message.const';
import emailSerivce from '../services/googleMail.service';
import { IMailOption } from '../interfaces/mail.interface';
import { getCodeRegisterEmailHtml } from '../assets/emailHtml/emailHtmlForm';
import config from '../config/config';
import { generateOTP } from '../utils/crypto.util';
import redisService from '../services/redis.service';
import { comparePassword, hashAPassword } from '../utils/bycript.util';
import { omit } from '../utils/common.util';
import jwtService from '../services/jwt.service';

class AuthController {
  login = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const loginData: ILoginUser = req.body;
      //check user exist
      const foundUser: IUserData | null = await userService.getUserByEmail(
        loginData.email,
      );
      if (!foundUser) {
        return next(
          new AppError(
            RETURN_MESSAGE.AUTH.SIGN_IN_ERROR,
            STATUS_CODE.BAD_REQUEST,
          ),
        );
      }

      if (!foundUser.password) {
        return next(
          new AppError(
            RETURN_MESSAGE.AUTH.SIGN_IN_ERROR,
            STATUS_CODE.BAD_REQUEST,
          ),
        );
      }

      const isCorrectPassword = comparePassword(
        foundUser.password,
        loginData.password,
      );

      if (!isCorrectPassword) {
        return next(
          new AppError(
            RETURN_MESSAGE.AUTH.SIGN_IN_ERROR,
            STATUS_CODE.BAD_REQUEST,
          ),
        );
      }
      const dataUserForJwt = omit(foundUser, 'password');
      const token = jwtService.generateToken(dataUserForJwt);
      const refreshToken = jwtService.generateRefeshToken(dataUserForJwt);

      res.cookie('refresh-token', refreshToken, {
        httpOnly: true,
        secure: config.nodeEnv !== 'development' ? true : false,
        sameSite: 'strict',
        maxAge: 60 * 60 * 15 * 1000,
      });

      return res.status(STATUS_CODE.OK).json({
        message: RETURN_MESSAGE.AUTH.SIGN_IN_SUCCESS,
        data: token,
      });
    },
  );

  register = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const registerData: IRegisterUser = req.body;

      //check user exist
      const foundUser = await userService.getUserByEmail(registerData.email);
      if (foundUser) {
        return next(
          new AppError(
            RETURN_MESSAGE.AUTH.EMAIL_CONFLICT,
            STATUS_CODE.CONFLICT,
          ),
        );
      }

      // gen otp code
      const code = generateOTP();

      const emailOption: IMailOption = {
        from: config.emailUser,
        to: registerData.email,
        subject: 'Ringing Register Code!',
        html: getCodeRegisterEmailHtml(code, registerData.name),
      };

      //set data for redis cache data
      const redisDataKey = `register-section-${code}`;
      const hashPassword = hashAPassword(registerData.password);

      const redisData = {
        name: registerData.name,
        email: registerData.email,
        phone: registerData.phone,
        birthDay: registerData.birthDay,
        password: hashPassword,
      };

      await redisService.setData(redisDataKey, redisData, 60 * 5);
      await emailSerivce.sendMail(emailOption);
      return res
        .status(STATUS_CODE.OK)
        .json({ message: RETURN_MESSAGE.COMMON.SUCCESS });
    },
  );

  verifyCode = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { code } = req.body;
      const redisDataKey = `register-section-${code}`;
      const redisData = await redisService.getData(redisDataKey);
      if (Object.keys(redisData).length === 0) {
        return res
          .status(STATUS_CODE.BAD_REQUEST)
          .json({ message: RETURN_MESSAGE.AUTH.VERIFY_CODE_FAIL });
      }
      const registerData: IRegisterUser = {
        name: redisData.name,
        email: redisData.email,
        phone: redisData.phone,
        birthDay: new Date(redisData.birthDay),
        password: redisData.password,
      };
      await userService.createNewUser(registerData);
      return res
        .status(STATUS_CODE.OK)
        .json({ message: RETURN_MESSAGE.AUTH.REGISTER_SUCCESS });
    },
  );

  changePassword = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { newPassword, oldPassword, userData } = req.body;
      const foundUser: IUserData | null = await userService.getUserByEmail(
        userData.email,
      );
      if (!foundUser)
        return next(
          new AppError(
            RETURN_MESSAGE.AUTH.CHANGE_PASSWORD_FAIL,
            STATUS_CODE.BAD_REQUEST,
          ),
        );

      const checkOldPassword = comparePassword(
        oldPassword,
        foundUser?.password || '',
      );

      if (!checkOldPassword)
        return next(
          new AppError(
            RETURN_MESSAGE.AUTH.CHANGE_PASSWORD_FAIL,
            STATUS_CODE.BAD_REQUEST,
          ),
        );

      const filter = {
        email: userData.email,
      };

      const hashPassword = hashAPassword(newPassword);
      const updateData = {
        password: hashPassword,
      };
      await userService.updateUserData(filter, updateData);
      return res.status(STATUS_CODE.OK).json({
        message: RETURN_MESSAGE.AUTH.CHANGE_PASSWORD_SUCCES,
      });
    },
  );

  forgotPassword = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {},
  );

  verifyEmailforgotPasswod = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {},
  );

  resetPassword = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {},
  );
}

const authController = new AuthController();
export default authController;
