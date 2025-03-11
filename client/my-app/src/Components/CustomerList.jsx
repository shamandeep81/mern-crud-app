import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers, deleteCustomer } from '../redux/customerSlice';
import CustomerForm from './CustomerForm';

const CustomerList = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers.list);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteCustomer(id));
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingCustomer(null);
    setShowForm(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <button 
        className="bg-blue-500 text-white px-4 py-2 mb-4 rounded"
        onClick={handleNew}
      >
        New Customer
      </button>
      {showForm && (
        <CustomerForm 
          customer={editingCustomer} 
          onClose={() => setShowForm(false)} 
        />
      )}
      <table className="min-w-full bg-white">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Contact</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Membership</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td className="py-2 px-4 border">{customer.firstName} {customer.lastName}</td>
              <td className="py-2 px-4 border">{customer.contactNumber}</td>
              <td className="py-2 px-4 border">{customer.email}</td>
              <td className="py-2 px-4 border">{customer.status}</td>
              <td className="py-2 px-4 border">{customer.membership ? customer.membership.name : ''}</td>
              <td className="py-2 px-4 border">
                <button 
                  className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
                  onClick={() => handleEdit(customer)}
                >
                  Edit
                </button>
                <button 
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(customer._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {customers.length === 0 && (
            <tr>
              <td colSpan="6" className="py-4 text-center">
                No customers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
