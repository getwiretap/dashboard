const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();


exports.createUserProfile = functions.auth.user().onCreate((user) => {
  const {
    displayName,
    email,
    photoURL,
    uid,
  } = user;

  const db = admin.firestore();
  const userRef = db.collection('users').doc(uid);

  return userRef.set({
    displayName,
    email,
    photoURL,
    uid,
  });
});
