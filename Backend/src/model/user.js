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

  const animalsData = [
    { name: "boar", threatLevel: "medium" },
    { name: "bear", threatLevel: "high" },
    { name: "alligator", threatLevel: "high" },
    { name: "cougar", threatLevel: "medium" },
    { name: "coyote", threatLevel: "medium" },
    { name: "deer", threatLevel: "low" },
    { name: "fox", threatLevel: "low" },
    { name: "moose", threatLevel: "medium" },
    { name: "raccoon", threatLevel: "low" },
    { name: "skunk", threatLevel: "low" },
    { name: "snake", threatLevel: "medium" },
    { name: "wolf", threatLevel: "high" },
  ];

  const user = await prisma.user.create({
    data: {
      username,
      email,
      phoneNumber,
    },
  });

  // Create the animals

  animalsData.forEach(async (animal) => {
    const { name, threatLevel } = animal;
    await prisma.animal.create({
      data: {
        name,
        threatLevel,
        userId: user.id,
      },
    });
  });

  return user;
};
