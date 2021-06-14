import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import log from '../logger';
import User from '../models/userModel';
import IUser from '../interfaces/user';
import signJWT from '../functions/signJWT';

const validateToken = (request: Request, response: Response) => {
  log.info('Token validated');
  return response.status(200).send('Authorized');
};

const register = async (request: Request, response: Response) => {
  try {
    const hashedPassword = await bcrypt.hash(request.body.password, 10);

    const user = new User({
      ...request.body,
      password: hashedPassword,
    });

    log.debug('user = ' + JSON.stringify(user.toObject(), null, 2));

    const result: IUser = await user.save();

    log.info('User registered');

    return response.status(201).json({
      id: result._id,
      email: result.email,
    });
  } catch (error) {
    log.error(error);
    return response.status(500).send(error.message);
  }
};

const login = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      log.error('Email address or password missing in request');
      return response.status(400).send('Invalid request');
    }

    const user: IUser | null = await User.findOne({ email: email }).exec();

    if (!user) {
      log.error('Email address not found');
      return response.status(401).json({
        error: 'Invalid credentials',
      });
    }

    const isCorrectPassword: boolean = await bcrypt.compare(
      password,
      user.password
    );

    if (!isCorrectPassword) {
      log.error('Incorrect password');
      return response.status(401).json({
        error: 'Invalid credentials',
      });
    }

    log.info('User authenticated');

    signJWT(user, (error, token) => {
      if (error) {
        log.error('Unable to sign token');
        return response.status(500).send(error.message);
      }

      log.info('Token signed');

      user.password = '';

      return response.status(200).json({
        message: 'Authentication successful',
        token,
        user,
      });
    });
  } catch (error) {
    log.error(error);
    return response.status(500).send(error.message);
  }
};

const getAllUsers = async (request: Request, response: Response) => {
  try {
    const users = await User.find()
      .sort({ createdAt: -1 })
      .select('-password')
      .exec();

    return response.status(200).json({
      users,
      count: users.length,
    });
  } catch (error) {
    log.error(error);
    return response.status(500).send(error.message);
  }
};

export default {
  validateToken,
  register,
  login,
  getAllUsers,
};
