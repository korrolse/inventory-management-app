const express = require('express');
const app = express();

app.get('/products', (req, res) => {
    res.json([
        {
            id: 1,
            name: 'Mouse',
            quantity: 10,
            price: 25
        },
        {
            id: 2,
            name: 'Keyboard',
            quantity: 3,
            price: 50
        }
    ]);
});

app.listen(4000, () => {
    console.log('Server is running on port 4000')
});