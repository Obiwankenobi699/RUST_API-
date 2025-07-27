import express from 'express';
import Todo from '../models/todo.model.js'; // add .js if using ES Modules

const router = express.Router();

// GET all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find(); // ✅ add await
    res.json(todos); // ✅ fixed req.json to res.json
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new todo
router.post('/', async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });

  try {
    const newTodo = await todo.save(); // ✅ add await
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Update a todo (text and/or completed)
router.patch('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).json({ message: "Todo not found" });

    if (req.body.text !== undefined) {
      todo.text = req.body.text;
    }

    if (req.body.completed !== undefined) {
      todo.completed = req.body.completed;
    }

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Delete a todo by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully', todo: deletedTodo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
