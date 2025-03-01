import express from "express";
import { getAnimals, getAnimal, createAnimal, updateAnimal, deleteAnimal } from "../controllers/animal.controller.js";
import upload from "../middlewares/multerMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAnimals);
router.get("/:id", getAnimal);
router.post("/", upload.single("image"), authMiddleware, createAnimal);
router.put("/:id", upload.single("image"), authMiddleware, updateAnimal);
router.delete("/:id", authMiddleware, deleteAnimal);

export default router;
