import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const UserReporitory = {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  async createUser(data: { name: string; email: string; password: string }) {
    return prisma.user.create({
      data,
    });
  },
};
