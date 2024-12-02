import express from "express";
import { getAnimals, getAnimal, createAnimal, updateAnimal, deleteAnimal } from "../controllers/animal.controller.js";

const router = express.Router();

router.get("/", getAnimals);
router.get("/:id", getAnimal);
router.post("/", createAnimal);
router.put("/:id", updateAnimal);
router.delete("/:id", deleteAnimal);

export default router;