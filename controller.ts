import { Request, Response } from "express";
import { Card, Board, List } from "./models";

const createCard = async (req: Request, res: Response) => {
  try {
    const { listId, title, description } = req.body;

    // Step 1: Check if the list exists
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    // Step 2: Create a new card
    const card = new Card({ title, description, list: listId });
    await card.save();

    // Step 3: Update the list to include the new card
    list.cards.push(card._id);
    await list.save();

    res.json(card);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getCardById = async (req: Request, res: Response) => {
  try {
    const cardId = req.params.id;
    const card = await Card.findById(cardId);

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.json(card);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateCard = async (req: Request, res: Response) => {
  try {
    const cardId = req.params.id;
    const { title, description } = req.body;
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { title, description },
      { new: true }
    );

    if (!updatedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.json(updatedCard);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteCard = async (req: Request, res: Response) => {
  try {
    const cardId = req.params.id;
    const deletedCard = await Card.findByIdAndDelete(cardId);

    if (!deletedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.json({ message: "Card deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// LISTS
const createList = async (req: Request, res: Response) => {
  try {
    const { boardId, name } = req.body;

    // Step 1: Check if the board exists
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    // Step 2: Create a new list
    const list = new List({ name, board: boardId });
    await list.save();

    // Step 3: Update the board to include the new list
    board.lists.push(list._id);
    await board.save();

    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getLists = async (req: Request, res: Response) => {
  try {
    const lists = await List.find();
    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getListById = async (req: Request, res: Response) => {
  try {
    const listId = req.params.id;
    const list = await List.findById(listId);

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateList = async (req: Request, res: Response) => {
  try {
    const listId = req.params.id;
    const { name, cards } = req.body;
    const updatedList = await List.findByIdAndUpdate(
      listId,
      { name, cards },
      { new: true }
    );

    if (!updatedList) {
      return res.status(404).json({ message: "List not found" });
    }

    res.json(updatedList);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteList = async (req: Request, res: Response) => {
  try {
    const listId = req.params.id;
    const deletedList = await List.findByIdAndDelete(listId);

    if (!deletedList) {
      return res.status(404).json({ message: "List not found" });
    }

    res.json({ message: "List deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Boards

const createBoard = async (req: Request, res: Response) => {
  try {
    const { name, listNames } = req.body;

    // Check if at least three list names are provided
    if (!listNames || listNames.length < 3) {
      return res
        .status(400)
        .json({ message: "At least three list names are required" });
    }

    // Step 1: Create a new board
    const board = new Board({ name });
    await board.save();

    // Step 2: Create lists for the board
    for (const listName of listNames) {
      const list = new List({ name: listName, board: board._id });
      await list.save();
      board.lists.push(list._id);
    }

    await board.save();

    res.json(board);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getBoards = async (req: Request, res: Response) => {
  try {
    const boards = await Board.find();
    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getBoardById = async (req: Request, res: Response) => {
  try {
    const boardId = req.params.id;
    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.json(board);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateBoard = async (req: Request, res: Response) => {
  try {
    const boardId = req.params.id;
    const { name, lists } = req.body;
    const updatedBoard = await Board.findByIdAndUpdate(
      boardId,
      { name, lists },
      { new: true }
    );

    if (!updatedBoard) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.json(updatedBoard);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteBoard = async (req: Request, res: Response) => {
  try {
    const boardId = req.params.id;
    const deletedBoard = await Board.findByIdAndDelete(boardId);

    if (!deletedBoard) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.json({ message: "Board deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export {
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
};
