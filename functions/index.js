const functions = require('firebase-functions');
const admin = require('firebase-admin');

const { validate } = require('./promptValidation');

admin.initializeApp();


exports.createUserProfile = functions.auth
  .user()
  .onCreate((user) => {
    const { displayName, email, uid } = user;

    const db = admin.firestore();
    const userRef = db.collection('users').doc(uid);

    return userRef.set({ displayName, email, uid });
  });


exports.validatePrompts = functions.firestore
  .document('transcriptions/{deviceID}')
  .onUpdate(async (change, context) => {
    const { transcription, uid } = change.after.data();
    const { deviceID } = context.params;

    const db = admin.firestore();

    const promptsRef = db.collection('prompts').where('uid', '==', uid);
    const ticketRef = db.collection('tickets').doc(deviceID);

    try {
      const querySnapshot = await promptsRef.get();

      querySnapshot.forEach((doc) => {
        const { id: promptID } = doc;
        const { label } = doc.data();

        const isValid = validate(transcription, label);

        if (isValid) {
          const ticketData = {
            prompts: { [promptID]: true },
            uid,
          };

          ticketRef.set(ticketData, { merge: true });
        }
      });
    } catch (error) {
      console.error('There was an error validating the prompt', error);
    }
  });
