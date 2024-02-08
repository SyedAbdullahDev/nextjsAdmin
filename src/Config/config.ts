import { initializeApp } from "firebase/app";
import { getFirestore, Firestore, collection, getDocs, QuerySnapshot } from "firebase/firestore";

   const firebaseConfig = {
        apiKey: "AIzaSyDjsddVIODaPYs30qAeip5MbioIj3Dwj8U",
        authDomain: "new-onroad.firebaseapp.com",
        projectId: "new-onroad",
        storageBucket: "new-onroad.appspot.com",
        messagingSenderId: "41692664405",
        appId: "1:41692664405:web:6e583c2443b25a9cb53adc",
        measurementId: "G-VZ0GZ1ZNEJ"
};


const app = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

export { db };
export const getDriverData = async (): Promise<QuerySnapshot> => {
  const collectionRef = collection(db, "driver");
  const snapshot = await getDocs(collectionRef);
  return snapshot;
};

export const getUserData = async (): Promise<QuerySnapshot> => {
  const collectionRef = collection(db, "user");
  const snapshot = await getDocs(collectionRef);
  return snapshot;
};
