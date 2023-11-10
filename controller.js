"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBoard = exports.updateBoard = exports.getBoardById = exports.getBoards = exports.createBoard = exports.deleteList = exports.updateList = exports.getListById = exports.getLists = exports.createList = exports.deleteCard = exports.updateCard = exports.getCardById = exports.getCards = exports.createCard = void 0;
const models_1 = require("./models");
const createCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { listId, title, description } = req.body;
        // Step 1: Check if the list exists
        const list = yield models_1.List.findById(listId);
        if (!list) {
            return res.status(404).json({ message: "List not found" });
        }
        // Step 2: Create a new card
        const card = new models_1.Card({ title, description, list: listId });
        yield card.save();
        // Step 3: Update the list to include the new card
        list.cards.push(card._id);
        yield list.save();
        res.json(card);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.createCard = createCard;
const getCards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cards = yield models_1.Card.find();
        res.json(cards);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getCards = getCards;
const getCardById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cardId = req.params.id;
        const card = yield models_1.Card.findById(cardId);
        if (!card) {
            return res.status(404).json({ message: "Card not found" });
        }
        res.json(card);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getCardById = getCardById;
const updateCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cardId = req.params.id;
        const { title, description } = req.body;
        const updatedCard = yield models_1.Card.findByIdAndUpdate(cardId, { title, description }, { new: true });
        if (!updatedCard) {
            return res.status(404).json({ message: "Card not found" });
        }
        res.json(updatedCard);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.updateCard = updateCard;
const deleteCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cardId = req.params.id;
        const deletedCard = yield models_1.Card.findByIdAndDelete(cardId);
        if (!deletedCard) {
            return res.status(404).json({ message: "Card not found" });
        }
        res.json({ message: "Card deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.deleteCard = deleteCard;
// LISTS
const createList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { boardId, name } = req.body;
        // Step 1: Check if the board exists
        const board = yield models_1.Board.findById(boardId);
        if (!board) {
            return res.status(404).json({ message: "Board not found" });
        }
        // Step 2: Create a new list
        const list = new models_1.List({ name, board: boardId });
        yield list.save();
        // Step 3: Update the board to include the new list
        board.lists.push(list._id);
        yield board.save();
        res.json(list);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.createList = createList;
const getLists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lists = yield models_1.List.find();
        res.json(lists);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getLists = getLists;
const getListById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listId = req.params.id;
        const list = yield models_1.List.findById(listId);
        if (!list) {
            return res.status(404).json({ message: "List not found" });
        }
        res.json(list);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getListById = getListById;
const updateList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listId = req.params.id;
        const { name, cards } = req.body;
        const updatedList = yield models_1.List.findByIdAndUpdate(listId, { name, cards }, { new: true });
        if (!updatedList) {
            return res.status(404).json({ message: "List not found" });
        }
        res.json(updatedList);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.updateList = updateList;
const deleteList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listId = req.params.id;
        const deletedList = yield models_1.List.findByIdAndDelete(listId);
        if (!deletedList) {
            return res.status(404).json({ message: "List not found" });
        }
        res.json({ message: "List deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.deleteList = deleteList;
// Boards
const createBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, listNames } = req.body;
        // Check if at least three list names are provided
        if (!listNames || listNames.length < 3) {
            return res
                .status(400)
                .json({ message: "At least three list names are required" });
        }
        // Step 1: Create a new board
        const board = new models_1.Board({ name });
        yield board.save();
        // Step 2: Create lists for the board
        for (const listName of listNames) {
            const list = new models_1.List({ name: listName, board: board._id });
            yield list.save();
            board.lists.push(list._id);
        }
        yield board.save();
        res.json(board);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.createBoard = createBoard;
const getBoards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boards = yield models_1.Board.find();
        res.json(boards);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getBoards = getBoards;
const getBoardById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boardId = req.params.id;
        const board = yield models_1.Board.findById(boardId);
        if (!board) {
            return res.status(404).json({ message: "Board not found" });
        }
        res.json(board);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getBoardById = getBoardById;
const updateBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boardId = req.params.id;
        const { name, lists } = req.body;
        const updatedBoard = yield models_1.Board.findByIdAndUpdate(boardId, { name, lists }, { new: true });
        if (!updatedBoard) {
            return res.status(404).json({ message: "Board not found" });
        }
        res.json(updatedBoard);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.updateBoard = updateBoard;
const deleteBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boardId = req.params.id;
        const deletedBoard = yield models_1.Board.findByIdAndDelete(boardId);
        if (!deletedBoard) {
            return res.status(404).json({ message: "Board not found" });
        }
        res.json({ message: "Board deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.deleteBoard = deleteBoard;
