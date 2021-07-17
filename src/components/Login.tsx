import React from 'react';
import firebase from '@utils/firebase/firebaseClient';

interface LoginProps {}

export const Login = ({}: LoginProps) => {
  async function signInWithGoogle() {
    const userCredentials = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider());

    console.log({ ...userCredentials.user });

    firebase.firestore().collection('users').doc(userCredentials.user.uid).set({
      uid: userCredentials.user.uid,
      email: userCredentials.user.email,
      name: userCredentials.user.displayName,
      provider: userCredentials.user.providerData[0].providerId,
      photoUrl: userCredentials.user.photoURL,
      createdAt: new Date(),
    });
  }

  return (
    <>
      <button
        onClick={() => signInWithGoogle()}
        className="bg-green-400 hover:bg-green-500 rounded p-2"
      >
        Sign in with Google
      </button>
    </>
  );
};

export default Login;
