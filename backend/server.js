const express = require('express');
const pool = require('./db');

const app = express();

app.use(express.json());

app.get('/products', async (req, res) => {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
})

app.listen(4000, () => {
    console.log('Server is running on port 4000')
});