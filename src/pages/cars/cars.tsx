import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../Config/config';
import CarTable from './carprop';
import './cars.scss';
import Add from '../../components/add/Add';
import { GridColDef } from '@mui/x-data-grid';

interface Car {
  id: string;
  make: string;
  model: string;
}

const columnso: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'make',
    type: 'string',
    headerName: 'Make',
    width: 150,
  },
  {
    field: 'model',
    type: 'string',
    headerName: 'Model',
    width: 150,
  },
];

const CarsCom = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    try {
      const carsCollection = collection(db, 'cars');
      const carsSnapshot = await getDocs(carsCollection);
      const carsData = carsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Car));
      setCars(carsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addDataToFirebase = async (newCar: Car) => {
    try {
      const carDocRef = await addDoc(collection(db, 'cars'), newCar);
      console.log('Car added with ID:', carDocRef.id);

    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  useEffect(() => {
    // Fetch data only when the component mounts
    fetchData();
  }, []); // Empty dependency array to run the effect only once

  const handleDeleteCar = (id: string) => {
    // Update the state to reflect the deleted car
    setCars((prevCars) => prevCars.filter((car) => car.id !== id));
  };

  return (
    <div className="app-container">
      <h2>Locations</h2>
      <div className="add-service-btn" onClick={() => setOpen(true)}>
        Add Location
      </div>
      {open && <Add slug="cars" columns={columnso} setOpen={setOpen} onAdd={addDataToFirebase} />}
      <CarTable cars={cars} onDelete={handleDeleteCar} />
    </div>
  );
};

export default CarsCom;