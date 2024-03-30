import { prisma } from "../../prisma.config.js";

export const getUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

export const createUser = async (data) => {
  const { username, email, phoneNumber } = data;

  const user = await prisma.user.create({
    data: {
      username,
      email,
      phoneNumber,

      animals: {
        connectOrCreate: {},
      },
    },
  });

  return user;
};
