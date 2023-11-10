import { Router, json } from "express";
import {
  createCard,
  getCards,
  getCardById,
  updateCard,
  deleteCard,
  createList,
  getLists,
  getListById,
  updateList,
  deleteList,
  createBoard,
  getBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
} from "./controller";

const router = Router();

router.use(json());

// Cards Routes
router.post("/cards", createCard);
router.get("/cards", getCards);
router.get("/cards/:id", getCardById);
router.put("/cards/:id", updateCard);
router.delete("/cards/:id", deleteCard);

// Lists Routes
router.post("/lists", createList);
router.get("/lists", getLists);
router.get("/lists/:id", getListById);
router.put("/lists/:id", updateList);
router.delete("/lists/:id", deleteList);

// Boards Routes
router.post("/boards", createBoard);
router.get("/boards", getBoards);
router.get("/boards/:id", getBoardById);
router.put("/boards/:id", updateBoard);
router.delete("/boards/:id", deleteBoard);

export default router;
