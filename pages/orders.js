import { useState } from 'react';
import Link from 'next/link';
import { ordersData } from '../../data/data';
import Pagination from '../components/pagination';

export default function Orders() {
  const [orders, setOrders] = useState(ordersData);
  const [filter, setFilter] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredOrders = orders.filter(order =>
    filter ? order.status === filter : true
  ).filter(order =>
    order.customer.toLowerCase().includes(search.toLowerCase())
  );

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortKey === 'customer') {
      return a.customer.localeCompare(b.customer);
    }
    if (sortKey === 'itemCount') {
      return b.items.length - a.items.length;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = sortedOrders.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Orders</h1>
      <div className="mb-4">
        <label className="mr-2">Filter by Status:</label>
        <select onChange={e => setFilter(e.target.value)} className="border p-2">
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="mr-2">Search by Customer:</label>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2"
        />
      </div>
      <div className="mb-4">
        <label className="mr-2">Sort by:</label>
        <select onChange={e => setSortKey(e.target.value)} className="border p-2">
          <option value="">None</option>
          <option value="customer">Customer</option>
          <option value="itemCount">Item Count</option>
        </select>
      </div>
      <ul>
        {paginatedOrders.map(order => (
          <li key={order.id} className="border p-2 mb-2">
            <Link href={`/orders/${order.id}`}>
              <a>
                <p><strong>ID:</strong> {order.id}</p>
                <p><strong>Customer:</strong> {order.customer}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Items:</strong> {order.items.length}</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

