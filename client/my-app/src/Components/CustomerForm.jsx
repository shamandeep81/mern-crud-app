import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addCustomer, updateCustomer, fetchCustomers } from '../redux/customerSlice';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const API_URL = 'http://localhost:5000/api';

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  contactNumber: yup.string().required('Contact Number is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  status: yup.string().oneOf(['Gold', 'Diamond']).required('Status is required'),
  membership: yup.string().required('Membership is required'),
});

const CustomerForm = ({ customer, onClose }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    // Fetch memberships for dropdown
    const fetchMemberships = async () => {
      try {
        const res = await axios.get(`${API_URL}/memberships`);
        setMemberships(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMemberships();
  }, []);

  useEffect(() => {
    if (customer) {
      // Populate form if editing
      reset({
        firstName: customer.firstName,
        lastName: customer.lastName,
        contactNumber: customer.contactNumber,
        email: customer.email,
        status: customer.status,
        membership: customer.membership?._id,
      });
    } else {
      reset({
        firstName: '',
        lastName: '',
        contactNumber: '',
        email: '',
        status: '',
        membership: '',
      });
    }
  }, [customer, reset]);

  const onSubmit = async (data) => {
    try {
      if (customer) {
        await dispatch(updateCustomer({ id: customer._id, data }));
      } else {
        await dispatch(addCustomer(data));
      }
      dispatch(fetchCustomers());
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded mb-4">
      <h2 className="text-xl font-bold mb-2">
        {customer ? 'Edit Customer' : 'New Customer'}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">First Name</label>
          <input 
            type="text" 
            {...register('firstName')}
            className="border p-2 rounded w-full"
          />
          <p className="text-red-500 text-sm">{errors.firstName?.message}</p>
        </div>
        <div>
          <label className="block mb-1">Last Name</label>
          <input 
            type="text" 
            {...register('lastName')}
            className="border p-2 rounded w-full"
          />
          <p className="text-red-500 text-sm">{errors.lastName?.message}</p>
        </div>
        <div>
          <label className="block mb-1">Contact Number</label>
          <input 
            type="text" 
            {...register('contactNumber')}
            className="border p-2 rounded w-full"
          />
          <p className="text-red-500 text-sm">{errors.contactNumber?.message}</p>
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input 
            type="email" 
            {...register('email')}
            className="border p-2 rounded w-full"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>
        <div>
          <label className="block mb-1">Status</label>
          <select 
            {...register('status')}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Status</option>
            <option value="Gold">Gold</option>
            <option value="Diamond">Diamond</option>
          </select>
          <p className="text-red-500 text-sm">{errors.status?.message}</p>
        </div>
        <div>
          <label className="block mb-1">Membership</label>
          <select 
            {...register('membership')}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Membership</option>
            {memberships.map((mem) => (
              <option key={mem._id} value={mem._id}>{mem.name}</option>
            ))}
          </select>
          <p className="text-red-500 text-sm">{errors.membership?.message}</p>
        </div>
        <div className="space-x-2">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {customer ? 'Update' : 'Create'}
          </button>
          <button 
            type="button" 
            onClick={onClose} 
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
