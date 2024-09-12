import bcrypt from 'bcrypt';
import { UserReporitory } from '../repositories/userRepository';
import { FastifyInstance } from 'fastify';

export const AuthService = {
  async login(email: string, password: string, app: FastifyInstance) {
    const user = await UserReporitory.findByEmail(email);
    if (!user) throw new Error('User not found!');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid password!');

    const token = app.jwt.sign(
      { id: user.id, email: user.email },
      { expiresIn: '1d' }
    );

    return { token };
  },

  async register(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const emailHasExist = await UserReporitory.findByEmail(email);
    if (emailHasExist) throw new Error('Email already registered!');

    return UserReporitory.createUser({
      name,
      email,
      password: hashedPassword,
    });
  },
};
