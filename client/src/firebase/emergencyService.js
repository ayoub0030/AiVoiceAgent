import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from './config';

// Collection reference
const emergenciesRef = collection(db, 'emergencies');

// Add a new emergency
export const addEmergency = async (emergency) => {
  try {
    const docRef = await addDoc(emergenciesRef, {
      ...emergency,
      createdAt: new Date().toISOString(),
      status: emergency.status || 'CRITICAL'
    });
    return { id: docRef.id, ...emergency };
  } catch (error) {
    console.error('Error adding emergency: ', error);
    throw error;
  }
};

// Get all emergencies
export const getEmergencies = async () => {
  try {
    const querySnapshot = await getDocs(emergenciesRef);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting emergencies: ', error);
    throw error;
  }
};

// Update emergency status
export const updateEmergencyStatus = async (emergencyId, status) => {
  try {
    const emergencyRef = doc(db, 'emergencies', emergencyId);
    await updateDoc(emergencyRef, { status });
    return true;
  } catch (error) {
    console.error('Error updating emergency status: ', error);
    throw error;
  }
};

// Subscribe to emergency updates
export const subscribeToEmergencies = (callback) => {
  const q = query(emergenciesRef, orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (snapshot) => {
    const emergencies = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(emergencies);
  });
};
