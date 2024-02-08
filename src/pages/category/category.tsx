import React, { useEffect, useState } from 'react';
import './category.scss';
import { GridColDef } from '@mui/x-data-grid';
import Add from '../../components/add/Add';
import { deleteDoc, doc, getDocs, collection } from 'firebase/firestore';
import { db } from '../../Config/config';

const CatGrids: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<any[]>([]);


const columnstwoo: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    type: "string",
    headerName: "Name",
    width: 150,
  },
  {
    field: "desc",
    type: "string",
    headerName: "Desc",
    width: 150,
  },
 
];


  useEffect(() => {
    const fetchcategorys = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'category'));
        const categorysData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategory(categorysData);
      } catch (error) {
        console.error('Error fetching categorys:', error);
      }
    };

    fetchcategorys();
  }, []);

  const deleteFromFirestore = async (id: string) => {
    const categoryRef = doc(db, 'category', id);
    await deleteDoc(categoryRef);
  };

  const handleDeletecategory = async (id: string) => {
    try {
      await deleteFromFirestore(id);
      setCategory((prevcategorys) => prevcategorys.filter((category) => category.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleAddcategory = async (newcategoryData: any) => {
    // Add logic to handle the addition of a new category
    console.log('Adding a new category:', newcategoryData);

    setOpen(false);
  };

  return (
    <div className="container">
      {category.map((category) => (
        <div className="category-grid" key={category.id}>
          <h2>{category.name}</h2>
          {/* Display other details as needed */}
          <button onClick={() => handleDeletecategory(category.id)}>Delete</button>
        </div>
      ))}
      <div className="add-category-btn" onClick={() => setOpen(true)}>
        Add Category
      </div>
      {open && <Add slug="category
      " columns={columnstwoo} setOpen={setOpen} onAdd={handleAddcategory} />}
    </div>
  );
};

export default CatGrids;
