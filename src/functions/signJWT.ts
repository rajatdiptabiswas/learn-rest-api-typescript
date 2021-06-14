import jwt from 'jsonwebtoken';
import log from '../logger';
import config from '../config/config';
import IUser from '../interfaces/user';

const signJWT = (
  user: IUser,
  callback: (error: Error | null, token: string | null) => void
): void => {
  log.info(`Attempting to sign token for '${user.email}'`);

  try {
    const payload = {
      user: {
        id: user._id,
        email: user.email,
      },
    };

    jwt.sign(
      payload,
      config.token.secret,
      {
        issuer: config.token.issuer,
        algorithm: 'HS256',
        expiresIn: config.token.expireTime,
      },
      (error, token) => {
        if (error) {
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
      }
    );
  } catch (error) {
    log.error(error);
    callback(error, null);
  }
};

export default signJWT;
