import {useEffect, useState} from 'react';

function StatusBadge({status}) {
  return (
    <span className={`status status-${status}`}>
      {status.replace('_', ' ')}
    </span>
  )
}

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const [editingProduct, setEditingProduct] = useState(null);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:4000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name, 
        quantity: Number(quantity), 
        price: Number(price),
       }),
    });

    if (!response.ok) {
      setError('Failed to create product');
      return;
    }
    
    const newProduct = await response.json();

    setProducts((currentProducts) => [
      ...currentProducts,
      newProduct
    ]);

    setName('');
    setQuantity('');
    setPrice('');
  }

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`http://localhost:4000/products/${editingProduct.id}`, 
      {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: editingProduct.name,
        quantity: Number(editingProduct.quantity),
        price: Number(editingProduct.price),
      }),
    });

    if (!response.ok) {
      setError('Failed to update product');
      return;
    }

    const updatedProduct = await response.json();

    setProducts((currentProducts) => 
      currentProducts.map((product) => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );

    setEditingProduct(null);
  }

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:4000/products/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      setError('Failed to delete product');
      return;
    }

    setProducts((currentProducts) => 
      currentProducts.filter((product) => product.id !== id)
    );
  }

  return (
    <div>
      <h1>Inventory</h1>
      
      {loading && <p>Loading products...</p>}
      {error && <p>{error}</p>}

      <table>
        <thread>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thread>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>€{product.price}</td>
              <td><StatusBadge status = {product.status} /></td>
              <td>
                <button onClick={() => setEditingProduct(product)}>
                  Edit
                </button>
                
                <button onClick={() => handleDelete(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleSubmit}>
          <input 
            type="text"
            placeholder="Product name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <input 
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            min="0"
            required
          />

          <input
            type="number"
            step="0.01"
            placeholder="Price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            min="0"
            required
          />

          <button type="submit">Add Product</button>
      </form>

      {editingProduct && (
        <form onSubmit={handleEditSubmit}>
          <h2>Edit product</h2>

          <input
          type="text"
          value={editingProduct.name}
          onChange={(event) => 
            setEditingProduct({
            ...editingProduct,
            name: event.target.value
          })
          }
          required
        />
        <input
          type="number"
          value={editingProduct.quantity}
          onChange={(event) => 
            setEditingProduct({
            ...editingProduct,
            quantity: event.target.value,
          })
          }
          min="0"
          required
        />
        <input
          type="number"
          step="0.01"
          value={editingProduct.price}
          onChange={(event) => 
            setEditingProduct({
            ...editingProduct,
            price: event.target.value,
          })
          }
          min="0"
          required
        />
        <button type="submit">Save changes</button>
        <button 
          type="button" 
          onClick={() => setEditingProduct(null)}
          >
          Cancel
        </button>
        </form>
      )}
    </div>
  );
}

export default App;