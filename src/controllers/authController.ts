import { AuthService } from '../services/authService';
import { FastifyReply, FastifyRequest } from 'fastify';

export const AuthController = {
  async login(resquest: FastifyRequest, reply: FastifyReply) {
    const { email, password } = resquest.body as any;
    try {
      const token = await AuthService.login(email, password, resquest.server);
      reply.send(token);
    } catch (err: any) {
      reply.status(400).send(err.message);
    }
  },

  async register(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = request.body as any;
    try {
      const user = await AuthService.register(name, email, password);
      reply.status(201).send(user);
    } catch (err: any) {
      reply.status(400).send(err.message);
    }
  },
};
