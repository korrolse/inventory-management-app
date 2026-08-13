import {useEffect, useState} from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load products');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Inventory</h1>
      
      {loading && <p>Loading products...</p>}
      {error && <p>{error}</p>}

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