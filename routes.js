"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.use((0, express_1.json)());
// Cards Routes
router.post("/cards", controller_1.createCard);
router.get("/cards", controller_1.getCards);
router.get("/cards/:id", controller_1.getCardById);
router.put("/cards/:id", controller_1.updateCard);
router.delete("/cards/:id", controller_1.deleteCard);
// Lists Routes
router.post("/lists", controller_1.createList);
router.get("/lists", controller_1.getLists);
router.get("/lists/:id", controller_1.getListById);
router.put("/lists/:id", controller_1.updateList);
router.delete("/lists/:id", controller_1.deleteList);
// Boards Routes
router.post("/boards", controller_1.createBoard);
router.get("/boards", controller_1.getBoards);
router.get("/boards/:id", controller_1.getBoardById);
router.put("/boards/:id", controller_1.updateBoard);
router.delete("/boards/:id", controller_1.deleteBoard);
exports.default = router;
