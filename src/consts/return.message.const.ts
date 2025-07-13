const RETURN_MESSAGE = {
  AUTH: {
    EMAIL_CONFLICT: 'Email is used!',
    SIGN_IN_ERROR: 'Email or passowrd is not correct!',
    REGISTER_SUCCESS: 'Register successfully!',
    SIGN_IN_SUCCESS: 'Sign in successfully!',
    VERIFY_CODE_FAIL: 'Verify code fail!',
    AUTHENTICATION_FAIL: 'Authenticate error!',
    AUTHORIZATION_FAIL: 'Authorization error!',
    CHANGE_PASSWORD_FAIL: 'Change password failed!',
    CHANGE_PASSWORD_SUCCES: 'Change password success!',
  },
  USER: {
    CREATE: 'User is created successfully!',
  },
  COMMON: {
    SERVER_ERROR: 'Server err! Just wait......me fix! 👌',
    SUCCESS: 'success',
  },
};

export default RETURN_MESSAGE;
