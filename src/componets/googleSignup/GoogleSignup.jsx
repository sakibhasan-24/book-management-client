import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { Button } from "flowbite-react";
import React from "react";
import app from "../../firebase/firebase.config";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/user/user";
import useGoogleSignIn from "../../hooks/useGoogleSignIn";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
// import { GoogleAuthProvider } from "firebase/auth/web-extension";
// import app from "../../firebase/firebase.config";
export default function GoogleSignup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { googleSignIn, loading } = useGoogleSignIn();
  const auth = getAuth(app);
  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      const result = await signInWithPopup(auth, provider);

      const userInfo = {
        userName: result.user.displayName,
        userEmail: result.user.email,
        profileImage: result.user.photoURL,
      };
      const res = await googleSignIn(userInfo);
      console.log(res);
      dispatch(loginSuccess(res));
      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "Login Success",
          text: "login successfully",
        }).then((result) => {
          if (result.isConfirmed) {
            // navigate();
            navigate(`${location.state?.from?.pathname || "/"}`);
          }
        });
      }
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
      disabled={loading}
    >
      {loading ? "loading....." : "Continue Using Google"}
    </Button>
  );
}
