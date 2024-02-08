// Driver.tsx

import { useEffect, useState } from 'react';
import './driver.scss';
import Add from '../../components/add/Add';
import { db, getDriverData } from '../../Config/config';
import DataTable from '../../components/dataTable/DataTable';
import { GridColDef } from '@mui/x-data-grid';
import { doc, deleteDoc } from 'firebase/firestore';


type DriverData = {
  id: string;
  firstname: string;
  lastname: string;
  phone: string;
  carnumber: string;
  verification: string;
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 120 },
  {
    field: "avatar",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "firstname",
    type: "string",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastname",
    type: "string",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "phone",
    type: "string",
    headerName: "Phone",
    width: 170,
  },
  {
    field: "carnumber",
    headerName: "Car Number",
    width: 120,
    type: "string",
  },
  {
    field: "Verification",
    headerName: "Verification",
    width: 120,
    type: "String",
  },
];

const columnstwoo: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstname",
    type: "string",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastname",
    type: "string",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "phone",
    type: "string",
    headerName: "Mobile Number",
    width: 170,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 120,
    type: "string",
  },
  {
    field: "email",
    headerName: "Email",
    width: 120,
    type: "String",
  },
  {
    field: "carmodel",
    headerName: "Car Model",
    width: 120,
    type: "String",
  },
  {
    field: "carcolor",
    headerName: "Car Color",
    width: 120,
    type: "String",
  },
  {
    field: "carnumber",
    headerName: "Car Number",
    width: 120,
    type: "String",
  },
  {
    field: "prodyear",
    headerName: "Car Prod Year",
    width: 120,
    type: "String",
  },
  {
    field: "address",
    headerName: "Address",
    width: 120,
    type: "String",
  },
  {
    field: "accnum",
    headerName: "Account Number",
    width: 120,
    type: "String",
  },
  {
    field: "bankname",
    headerName: "Bank Name",
    width: 120,
    type: "String",
  },
  {
    field: "bankroutenum",
    headerName: "Bank Route Number",
    width: 120,
    type: "String",
  },
  {
    field: "swiftcode",
    headerName: "Swift Code",
    width: 120,
    type: "String",
  },
  {
    field: "Verification",
    headerName: "Verification",
    width: 120,
    type: "String",
  },
];

const Driver = () => {
  const [drivers, setDrivers] = useState<DriverData[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getDriverData().then((snapshot) => {
      const driverData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as DriverData[];
      setDrivers(driverData);
    });
  }, []);
  const deleteDriverFromFirestore = async (id: string) => {
    const driverRef = doc(db, 'driver', id);
    await deleteDoc(driverRef);
  };
  const handleDeleteDriver = async (id: string) => {
    try {
      await deleteDriverFromFirestore(id);
      // Update the state to reflect the deleted driver
      setDrivers((prevDrivers) => prevDrivers.filter((driver) => driver.id !== id));
    } catch (error) {
      console.error('Error deleting driver:', error);
    }
  };


  const handleAddDriver = async (newDriverData: any) => {
    // Add logic to handle the addition of a new driver
    console.log('Adding a new driver:', newDriverData);

    // Assume you have a function to add data to Firestore
    // Replace this with your actual logic
    // await addDriverToFirestore(newDriverData);

    // Close the modal
    setOpen(false);
  };

  return (
    <div className="drivers">
      <div className="info">
        <h1>Vendor</h1>
        <button onClick={() => setOpen(true)}>Add New Vendor</button>
      </div>
      <DataTable
        slug="drivers"
        columns={columns}
        rows={drivers}
        onDelete={handleDeleteDriver}
      />
      {open && <Add slug="driver" columns={columnstwoo} setOpen={setOpen} onAdd={handleAddDriver} />}
    </div>
  );
};

export default Driver;
