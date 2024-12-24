import express from "express";
import { getAnimals, getAnimal, createAnimal, updateAnimal, deleteAnimal } from "../controllers/animal.controller.js";
import upload from "../middlewares/multerMiddleware.js";

const router = express.Router();

router.get("/", getAnimals);
router.get("/:id", getAnimal);
router.post("/", upload.single("image"), createAnimal);
router.put("/:id", upload.single("image"), updateAnimal);
router.delete("/:id", deleteAnimal);

export default router;
