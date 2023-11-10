import express from "express";
import mongoose from "mongoose";
import routes from "./routes";

const app = express();
// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/kanban_app");

// Use routes
app.use("/api", routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
