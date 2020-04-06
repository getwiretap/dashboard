import { useEffect } from 'react';
import firebase from 'firebase/app';


const Logout = () => {
  useEffect(() => { firebase.auth().signOut(); }, []);

  return null;
};

export default Logout;
