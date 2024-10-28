import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Configure multer for image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// In-memory storage for phones
let phones = [];

// Route to get all phones
app.get('/phones', (req, res) => {
  res.json(phones);
});

// Route to add a new phone
app.post('/phones', upload.single('image'), (req, res) => {
  const { model, description, price } = req.body;
  const newPhone = {
    id: uuidv4(),
    model,
    description,
    price: Number(price),
    image: req.file ? `data:image/jpeg;base64,${req.file.buffer.toString('base64')}` : null
  };

  phones.push(newPhone);
  res.json(newPhone);
});

// Route to update a phone
app.put('/phones/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { model, description, price } = req.body;

  const phoneIndex = phones.findIndex((phone) => phone.id === id);
  if (phoneIndex === -1) {
    return res.status(404).json({ error: 'Phone not found' });
  }

  phones[phoneIndex] = {
    ...phones[phoneIndex],
    model,
    description,
    price: Number(price),
    image: req.file ? `data:image/jpeg;base64,${req.file.buffer.toString('base64')}` : phones[phoneIndex].image
  };

  res.json(phones[phoneIndex]);
});

// Route to delete a phone
app.delete('/phones/:id', (req, res) => {
  const { id } = req.params;
  phones = phones.filter((phone) => phone.id !== id);
  res.json({ message: 'Phone deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
