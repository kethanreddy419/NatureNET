import { prisma } from "../../prisma.config.js";

export const getUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

export const getPhoneEmailById= async (userId)=>{
  const user = await prisma.user.findUnique({
    where:{id:userId}
  })
  console.log([user.email,user.phoneNumber])
  return [user.email,user.phoneNumber];
}

export const updateUserPhoneNumber = async (userId, newPhoneNumber) => {
  console.log(userId,newPhoneNumber)
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { phoneNumber: newPhoneNumber },
  });
  return updatedUser;
};

export const userStatusUpdate = async (userEmail) => {
  // Set "Active" column to false for all users
  await prisma.user.updateMany({
    data: { Active: false }
  });

  // Set "Active" column to true for the user with the specified email
  const status = await prisma.user.update({
    where: { email: userEmail },
    data: { Active: true },
  });

  return status;
};



export const getActiveUser = async()=>{
  const status = await prisma.user.findMany({
    where:{Active: true},
  })
  // console.log(status)

  return status[0];
}




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
