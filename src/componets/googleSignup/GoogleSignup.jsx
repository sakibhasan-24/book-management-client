import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { Button } from "flowbite-react";
import React from "react";
import app from "../../firebase/firebase.config";
// import { GoogleAuthProvider } from "firebase/auth/web-extension";
// import app from "../../firebase/firebase.config";
export default function GoogleSignup() {
  const auth = getAuth(app);
  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      onClick={handleGoogleSignup}
      className="w-full  "
      outline
      gradientDuoTone="greenToBlue"
      type="button"
    >
      Continue Using Google
    </Button>
  );
}
