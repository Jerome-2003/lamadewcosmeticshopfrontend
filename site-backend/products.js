const express = require('express');
const db = require('../database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

const VALID_CATEGORIES = ['cleanse', 'treat', 'protect'];

// GET /api/products — get all products (public)
router.get('/', (req, res) => {
  try {
    const { category } = req.query;

    let products;
    if (category) {
      if (!VALID_CATEGORIES.includes(category)) {
        return res.status(400).json({ error: `Category must be one of: ${VALID_CATEGORIES.join(', ')}` });
      }
      products = db.prepare('SELECT * FROM products WHERE category = ? ORDER BY created_at ASC').all(category);
    } else {
      products = db.prepare('SELECT * FROM products ORDER BY category, created_at ASC').all();
    }

    res.json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/products/:id — get a single product (public)
router.get('/:id', (req, res) => {
  try {
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/products — add a new product (protected)
router.post('/', authMiddleware, (req, res) => {
  const { id, name, category, price, desc, accent } = req.body;

  if (!id || !name || !category || !price) {
    return res.status(400).json({ error: 'id, name, category and price are required' });
  }

  if (!VALID_CATEGORIES.includes(category)) {
    return res.status(400).json({ error: `Category must be one of: ${VALID_CATEGORIES.join(', ')}` });
  }

  if (typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ error: 'Price must be a positive number' });
  }

  try {
    const existing = db.prepare('SELECT id FROM products WHERE id = ?').get(id);
    if (existing) {
      return res.status(409).json({ error: `Product with id "${id}" already exists` });
    }

    db.prepare(
      'INSERT INTO products (id, name, category, price, desc, accent) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(id, name, category, price, desc || '', accent || '');

    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    res.status(201).json({ message: 'Product added', product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PATCH /api/products/:id — update a product (protected)
router.patch('/:id', authMiddleware, (req, res) => {
  const { name, category, price, desc, accent } = req.body;

  if (category && !VALID_CATEGORIES.includes(category)) {
    return res.status(400).json({ error: `Category must be one of: ${VALID_CATEGORIES.join(', ')}` });
  }

  if (price !== undefined && (typeof price !== 'number' || price <= 0)) {
    return res.status(400).json({ error: 'Price must be a positive number' });
  }

  try {
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const updated = {
      name: name ?? product.name,
      category: category ?? product.category,
      price: price ?? product.price,
      desc: desc ?? product.desc,
      accent: accent ?? product.accent,
    };

    db.prepare(
      'UPDATE products SET name = ?, category = ?, price = ?, desc = ?, accent = ? WHERE id = ?'
    ).run(updated.name, updated.category, updated.price, updated.desc, updated.accent, req.params.id);

    const result = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    res.json({ message: 'Product updated', product: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/products/:id — delete a product (protected)
router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
