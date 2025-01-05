import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDYxYDSHcwBUnzSwrGyS7Jwe5Dzj9kh20g",
  authDomain: "voicecall-1e365.firebaseapp.com",
  projectId: "voicecall-1e365",
  storageBucket: "voicecall-1e365.firebasestorage.app",
  messagingSenderId: "685679988746",
  appId: "1:685679988746:web:238fa17bb271b0c82c4ff3",
  measurementId: "G-CQPFKBEQFB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db, analytics };
