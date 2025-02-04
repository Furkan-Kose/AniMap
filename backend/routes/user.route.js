import express from "express";
import { register, login, logout, getMe, getAllUsers, getUserById, updateUser, deleteUser, createUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authMiddleware, getMe);
router.get("/", getAllUsers);
router.post("/", createUser)
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);



export default router;