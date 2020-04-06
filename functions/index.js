const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();


exports.createUserProfile = functions.auth.user().onCreate((user) => {
  const { displayName, email, uid } = user;

  const db = admin.firestore();
  const userRef = db.collection('users').doc(uid);

  userRef.set({ displayName, email, uid });
});
