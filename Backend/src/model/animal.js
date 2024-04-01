import { prisma } from "../../prisma.config.js";


export const updateAnimalThreatLevel = async (animalId, newThreatLevel) => {
    const updatedAnimal = await prisma.animal.update({
      where: { id: animalId },
      data: { threatLevel: newThreatLevel },
    });
    return updatedAnimal;
  };