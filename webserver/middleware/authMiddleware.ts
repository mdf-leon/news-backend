import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../entities/User';

const checkAuthentication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.session.token;
    if (!token) {
      throw new Error('Authentication token not found');
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    const userId = decodedToken.userId;

    const user = await User.findOne({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    req.session.user = user;

    next();
  } catch (err: any) {
    res.status(401).send({ status: 'Unauthorized', message: err.message });
  }
};

export default checkAuthentication;
