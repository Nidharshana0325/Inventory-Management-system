import { useState } from 'react';
import { itemsData } from '../../data/data';

export default function Inventory() {
  const [items, setItems] = useState(itemsData);
  const [newItem, setNewItem] = useState({ name: '', stock: 0 });
  const [search, setSearch] = useState('');

  const handleAddItem = (e) => {
    e.preventDefault();
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    setItems([...items, { id, ...newItem }]);
    setNewItem({ name: '', stock: 0 });
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleEditItem = (id, updatedItem) => {
    setItems(items.map(item => (item.id === id ? updatedItem : item)));
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Inventory Management</h1>
      <form onSubmit={handleAddItem} className="mb-4">
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={newItem.stock}
          onChange={(e) => setNewItem({ ...newItem, stock: Number(e.target.value) })}
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Item
        </button>
      </form>
      <div className="mb-4">
        <label className="mr-2">Search by Item Name:</label>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2"
        />
      </div>
      <ul>
        {paginatedItems.map(item => (
          <InventoryItem
            key={item.id}
            item={item}
            onDelete={handleDeleteItem}
            onEdit={handleEditItem}
          />
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

function InventoryItem({ item, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState(item);

  const handleSave = () => {
    onEdit(item.id, editItem);
    setIsEditing(false);
  };

  return (
    <li className="border p-2 mb-2">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="number"
            value={editItem.stock}
            onChange={(e) => setEditItem({ ...editItem, stock: Number(e.target.value) })}
            className="border p-2 mr-2"
          />
          <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded mr-2">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white p-2 rounded">
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <p><strong>Name:</strong> {item.name}</p>
          <p><strong>Stock:</strong> {item.stock}</p>
          <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white p-2 rounded mr-2">
            Edit
          </button>
          <button onClick={() => onDelete(item.id)} className="bg-red-500 text-white p-2 rounded">
            Delete
          </button>
        </div>
      )}
    </li>
  );
}
