import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Add from "../../components/add/Add";
import DataTable from "../../components/dataTable/DataTable";
import './users.scss'
import { db, getUserData } from "../../Config/config";
import { doc, deleteDoc } from "firebase/firestore";

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
    field: "gender",
    headerName: "Gender",
    width: 120,
    type: "string",
  },
  
   {
    field: "city",
    headerName: "City",
    width: 120,
    type: "string",
  },
];
const columnstwo: GridColDef[] = [
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
    headerName: "Phone",
    width: 200,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 120,
    type: "string",
  },
   {
    field: "city",
    headerName: "City",
    width: 120,
    type: "string",
  },
 
];
const Users = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getUserData().then((snapshot) => {
      const userData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userData);
    });
  }, []);

  const deleteFromFirestore = async (id: string) => {
   const driverRef = doc(db, 'user', id);
  await deleteDoc(driverRef);
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteFromFirestore(id);
      // Update the state to reflect the deleted user
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleAddUser = async (newUserData: any) => {
    // Add logic to handle the addition of a new user
    console.log('Adding a new user:', newUserData);

    // Assume you have a function to add data to Firestore
    // Replace this with your actual logic
    // await addUserToFirestore(newUserData);

    // Close the modal
    setOpen(false);
  };

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New Users</button>
      </div>
      <DataTable slug="user" columns={columns} rows={users} onDelete={handleDeleteUser} />
      {open && <Add slug="user" columns={columnstwo} setOpen={setOpen} onAdd={handleAddUser} />}
    </div>
  );
};

export default Users;
