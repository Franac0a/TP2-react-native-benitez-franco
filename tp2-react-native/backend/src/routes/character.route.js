import { Router } from "express";
import {
  importCharacter,
  createCharacter,
  getAllCharacters,
  getCharacterById,
  updateCharacter,
  deleteCharacter,
} from "../controllers/character.controller.js";

export const router = Router();

// Rutas de personajes de One Piece
router.get("/", getAllCharacters);
router.get("/:id", getCharacterById);
router.post("/import", importCharacter);
router.post("/", createCharacter);
router.put("/:id", updateCharacter);
router.delete("/:id", deleteCharacter);

export default router;
