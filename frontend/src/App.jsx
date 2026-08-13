import {useEffect, useState} from 'react';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Inventory</h1>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.quantity} - €{product.price} - {product.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;