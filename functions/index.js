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

exports.createSession = functions.firestore.document('sessionPasswords/{password}').onUpdate((change) => {
  const sessionData = change.after.data();

  const db = admin.firestore();

  const sessionRef = db.collection('sessions').doc(sessionData.deviceId);
  const sessionPasswordRef = db.collection('sessionPasswords').doc(sessionData.password);

  return Promise.all([
    sessionRef.set(sessionData),
    sessionPasswordRef.delete(),
  ]);
});
