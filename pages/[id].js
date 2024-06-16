import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { ordersData, itemsData } from '../data/data';

export default function OrderDetails() {
  const router = useRouter();
  const { id } = router.query;
  
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (id) {
      const order = ordersData.find(order => order.id === parseInt(id));
      setOrder(order);
      setStatus(order?.status);
    }
  }, [id]);

  const handleComplete = () => {
    setStatus('Completed');
    // Here you should update the status in the ordersData array or send a request to an API to update the order status.
  };

  if (!order) return <p>Order not found</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Order Details</h1>
      <p><strong>ID:</strong> {order.id}</p>
      <p><strong>Customer:</strong> {order.customer}</p>
      <p><strong>Status:</strong> {status}</p>
      <h2 className="text-lg font-bold mt-4 mb-2">Items</h2>
      <ul>
        {order.items.map(item => {
          const inventoryItem = itemsData.find(i => i.id === item.id);
          return (
            <li key={item.id} className="border p-2 mb-2">
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Stock:</strong> {inventoryItem?.stock}</p>
            </li>
          );
        })}
      </ul>
      {status === "Pending" && (
        <button onClick={handleComplete} className="mt-4 bg-blue-500 text-white p-2 rounded">
          Mark as Completed
        </button>
      )}
    </div>
  );
}
