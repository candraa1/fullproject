import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('There was an error fetching the orders!', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="relative">
      <header className="App-header">
        <h1 className="text-2xl font-bold mb-4">Daftar Order</h1>
        {orders.length > 0 ? (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-2 border-b">Customer</th>
                <th className="px-4 py-2 border-b">Products</th>
                <th className="px-4 py-2 border-b">Total Price</th>
                <th className="px-4 py-2 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td className="px-4 py-2 border-b">{order.customerId.name}</td>
                  <td className="px-4 py-2 border-b">
                    <ul className="list-disc list-inside">
                      {order.products.map((product, index) => (
                        <li key={index}>
                          {product.productId.name} - Quantity: {product.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-2 border-b">{order.totalPrice}</td>
                  <td className="px-4 py-2 border-b">{new Date(order.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No orders available</p>
        )}
      </header>
    </div>
  );
}

export default App;
