const express = require('express');
const pool = require('./db');

const app = express();

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

app.listen(4000, () => {
    console.log('Server is running on port 4000')
});