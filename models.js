"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = exports.Board = exports.Card = void 0;
const mongoose_1 = require("mongoose");
const cardSchema = new mongoose_1.Schema({
    title: String,
    description: String,
});
const Card = (0, mongoose_1.model)("Card", cardSchema);
exports.Card = Card;
const listSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    cards: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Card",
        },
    ],
});
const List = (0, mongoose_1.model)("List", listSchema);
exports.List = List;
const boardSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    lists: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "List",
        },
    ],
});
const Board = (0, mongoose_1.model)("Board", boardSchema);
exports.Board = Board;
