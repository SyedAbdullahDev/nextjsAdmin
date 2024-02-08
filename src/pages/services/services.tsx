import React, { useEffect, useState } from 'react';
import './services.scss';
import { GridColDef } from '@mui/x-data-grid';
import Add from '../../components/add/Add';
import { deleteDoc, doc, getDocs, collection } from 'firebase/firestore';
import { db } from '../../Config/config';

const ServiceGrids: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState<any[]>([]);


const columnstwoo: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    type: "string",
    headerName: "Name",
    width: 150,
  },
  {
    field: "description",
    type: "string",
    headerName: "Description",
    width: 150,
  },
  {
    field: "category",
    type: "string",
    headerName: "Category",
    width: 170,
  },
  {
    field: "maxperson",
    headerName: "Max Person capacity",
    width: 120,
    type: "string",
  },
 
  {
    field: "basefare",
    headerName: "Base Fare",
    width:120,
    type: "String",
  },
  {
    field: "permeter",
    headerName: "Per Hundred Meter",
    width:120,
    type: "String",
  },
{
    field: "perminutewait",
    headerName: "Per Minute Wait",
    width:120,
    type: "String",
  },
  {
    field: "prepay",
    headerName: "Prepay Percent",
    width:120,
    type: "String",
  },
   {
    field: "minimumfee",
    headerName: "Minimum Fee",
    width:120,
    type: "String",
  },
   {
    field: "maximumdistance",
    headerName: "Maximum Distance",
    width:120,
    type: "String",
  },
  {
    field: "searchradius",
    headerName: "Search Radius",
    width:120,
    type: "String",
  },
   {
    field: "paymentmethod",
    headerName: "Payment Method",
    width:120,
    type: "String",
  },
    {
    field: "cancellationfee",
    headerName: "Cancellation Total Fee",
    width:120,
    type: "String",
  },
   {
    field: "cancellationshare",
    headerName: "Cancellation Driver Share",
    width:120,
    type: "String",
  },
   {
    field: "regions",
    headerName: "Regions",
    width:120,
    type: "String",
  },
];


  useEffect(() => {
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Service'));
        const servicesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setServices(servicesData);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const deleteFromFirestore = async (id: string) => {
    const serviceRef = doc(db, 'services', id);
    await deleteDoc(serviceRef);
  };

  const handleDeleteService = async (id: string) => {
    try {
      await deleteFromFirestore(id);
      setServices((prevServices) => prevServices.filter((service) => service.id !== id));
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleAddService = async (newServiceData: any) => {
    // Add logic to handle the addition of a new service
    console.log('Adding a new service:', newServiceData);

    // Assume you have a function to add data to Firestore
    // Replace this with your actual logic
    // await addServiceToFirestore(newServiceData);

    // Close the modal
    setOpen(false);
  };

  return (
    <div className="container">
      {services.map((service) => (
        <div className="service-grid" key={service.id}>
          <h2>{service.name}</h2>
          {/* Display other details as needed */}
          <button onClick={() => handleDeleteService(service.id)}>Delete</button>
        </div>
      ))}
      <div className="add-service-btn" onClick={() => setOpen(true)}>
        Add Service
      </div>
      {open && <Add slug="Service" columns={columnstwoo} setOpen={setOpen} onAdd={handleAddService} />}
    </div>
  );
};

export default ServiceGrids;
