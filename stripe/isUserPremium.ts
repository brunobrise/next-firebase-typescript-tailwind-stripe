import firebase from '../firebase/firebaseClient';

export default async function isUserPremium(): Promise<boolean> {
  await firebase.auth().currentUser?.getIdToken(true);
  const decodedToken = await firebase.auth().currentUser?.getIdTokenResult();

  // Returns whether the user has a Custom Claim stripe role
  // I.e. the firebaseRole metadata value you set up in your Stripe products
  return decodedToken?.claims?.stripeRole ? true : false;
}
