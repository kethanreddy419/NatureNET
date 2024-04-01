import express from "express";
import { updateAnimalThreatLevel } from "../model/animal.js";

const router = express.Router();

router.put('/:animalId/threatLevel', async (req, res) => {
  const { animalId } = req.params;
  const { threatLevel } = req.body;

  if (!threatLevel) {
    return res.status(400).send("New threat level is required.");
  }

  try {
    const updatedAnimal = await updateAnimalThreatLevel(parseInt(animalId), threatLevel);
    res.json(updatedAnimal);
  } catch (error) {
    res.status(500).send("Failed to update animal's threat level.");
  }
});

export default router;
