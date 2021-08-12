import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const config = {
  apiKey: "AIzaSyAXTTtwQdsA3D02UrIS6_g8mxa3DUR3Z-w",
  authDomain: "crwn-db-d391e.firebaseapp.com",
  projectId: "crwn-db-d391e",
  storageBucket: "crwn-db-d391e.appspot.com",
  messagingSenderId: "517702466111",
  appId: "1:517702466111:web:d72a03c1b1f96bb982168a",
  measurementId: "G-PTYZKR4Y8G",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  // console.log(userAuth);
  // console.log(additionalData);
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  // console.log(userRef);
  // console.log(snapshot);

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    // console.log(displayName);
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  // console.log(snapshot);
  return userRef;
};

// export const addCollectionAndDocuments = async (
//   collectionKey,
//   objectsToAdd
// ) => {
//   const collectionRef = firestore.collection(collectionKey);

//   const batch = firestore.batch();
//   objectsToAdd.forEach((obj) => {
//     const newDocRef = collectionRef.doc();
//     batch.set(newDocRef, obj);
//   });

//   return await batch.commit();
// };

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
