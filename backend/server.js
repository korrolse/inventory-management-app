const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/products', async (req, res) => {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
});

app.post('/products', async (req, res) => {
    const {name, quantity, price} = req.body;

    if (!name) {
        return res.status(400).json({error: 'Name is required'});
    }

    if (quantity < 0) {
        return res.status(400).json({error: 'Quantity cannot be negative'});
    }

    if (price < 0) {
        return res.status(400).json({error: 'Price cannot be negative'});
    }

    let status;

    if(quantity === 0) {
        status = 'out_of_stock';
    } else if (quantity <= 5) {
        status = 'low_stock';
    } else {
        status = 'in_stock';
    }

    const result = await pool.query(
    `INSERT INTO products (name, quantity, price, status)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, quantity, price, status]
  );

  res.status(201).json(result.rows[0]);
});

app.patch('/products/:id', async (req, res) => {
    const {id} = req.params;
    const {name, quantity, price} = req.body;

    if (!name) {
        return res.status(400).json({error: 'Name is required'});
    }
    if (quantity < 0) {
        return res.status(400).json({error: 'Quantity cannot be negative'});
    }

    if (price < 0) {
        return res.status(400).json({error: 'Price cannot be negative'});
    }

    let status;

    if(quantity === 0) {
        status = 'out_of_stock';
    } else if (quantity <= 5) {
        status = 'low_stock';
    } else {
        status = 'in_stock';
    }

    const result = await pool.query(
     `UPDATE products
     SET name = $1,
         quantity = $2,
         price = $3,
         status = $4
     WHERE id = $5
     RETURNING *`,
    [name, quantity, price, status, id]
    );

    if (result.rows.length === 0) {
        return res.status(404).json({error: 'Product not found'});
    }

    res.json(result.rows[0]);
});

app.delete('/products/:id', async (req, res) => {
    const {id} = req.params;

    const result = await pool.query(
        `DELETE FROM products
        WHERE id = $1
        RETURNING *`,
        [id]
    );

    if (result.rows.length === 0) {
        return res.status(404).json({error: 'Product not found'});
    }

    res.json({
        message: 'Product deleted successfully',
        product: result.rows[0]
    });
});

app.listen(4000, () => {
    console.log('Server is running on port 4000')
});