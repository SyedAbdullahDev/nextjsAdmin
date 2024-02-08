
import React from 'react';
import './cars.scss';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../Config/config';

interface Car {
  id: string;
  make: string;
  model: string;
}

interface CarTableProps {
  cars: Car[];
  onDelete: (id: string) => void;
}

const CarTable: React.FC<CarTableProps> = ({ cars, onDelete }) => {
  const handleDelete = async (id: string) => {
    try {
      // Delete car from Firestore
      const carRef = doc(db, 'cars', id);
      await deleteDoc(carRef);

      // Trigger the parent component's onDelete function
      onDelete(id);
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  return (
    <table className="car-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Make</th>
          <th>Model</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {cars.map((car) => (
          <tr key={car.id}>
            <td>{car.id}</td>
            <td>{car.make}</td>
            <td>{car.model}</td>
            <td>
              <button onClick={() => handleDelete(car.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CarTable;