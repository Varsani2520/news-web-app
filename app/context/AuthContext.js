import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { loginUser } from "../action/action";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const googleSignIn = async ({ dispatch }) => {
  const provider = new GoogleAuthProvider();
  const response = await signInWithPopup(auth, provider);

  try {
    const userObject = {
      name: response.user.displayName,
      email: response.user.email,
      url: response.user.photoURL,
    };
    dispatch(loginUser(userObject));
    Cookies.set("login", true);
    toast.success("user logged in successfully");
  } catch (error) {
    console.log("google error", error);
  }
};

const logOut = () => {
  signOut(auth);
};

export async function handleSignIn({ dispatch }) {
  try {
    await googleSignIn({ dispatch });
  } catch (error) {
    console.log(error, "google eror");
  }
}

export async function handleSignOut() {
  try {
    await logOut();
  } catch (error) {
    console.log(error);
  }
}
