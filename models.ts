import { Schema, model, Document, Model } from "mongoose";

interface ICard extends Document {
  title: string;
  description: string;
}

const cardSchema = new Schema({
  title: String,
  description: String,
});

const Card: Model<ICard> = model<ICard>("Card", cardSchema);

interface IList extends Document {
  name: string;
  cards: Array<ICard["_id"]>;
}

const listSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cards: [
    {
      type: Schema.Types.ObjectId,
      ref: "Card",
    },
  ],
});

const List: Model<IList> = model<IList>("List", listSchema);

interface IBoard extends Document {
  name: string;
  lists: Array<IList["_id"]>;
}

const boardSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lists: [
    {
      type: Schema.Types.ObjectId,
      ref: "List",
    },
  ],
});

const Board: Model<IBoard> = model<IBoard>("Board", boardSchema);

export { Card, Board, List };
