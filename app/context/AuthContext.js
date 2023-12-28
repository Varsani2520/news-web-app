// import { useContext, createContext, useState, useEffect } from "react";
// import { auth } from "../firebase";
// import {
//   signInWithPopup,
//   signOut,
//   onAuthStateChanged,
//   GoogleAuthProvider,
// } from "firebase/auth";
// import { useDispatch } from "react-redux";
// import { loginUser } from "../action/action";

// const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const googleSignIn = () => {
//     const provider = new GoogleAuthProvider();
//     signInWithPopup(auth, provider);
//     const dispatch = useDispatch();
//     dispatch(loginUser(user));
//   };
//   const logOut = () => {
//     signOut(auth);
//   };
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//     return () => unsubscribe();
//   }, [user]);
//   return (
//     <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// export const UserAuth = () => {
//   return useContext(AuthContext);
// };

// your code
import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import {  loginUser } from "../action/action";
import Cookies from "js-cookie";


const googleSignIn = async ({ dispatch }) => {
  const provider = new GoogleAuthProvider();
  const response = await signInWithPopup(auth, provider); // this  print all user information in console for further processing
  console.log("google response", response);
  
  try {
    const userObject = {
      name: response.user.displayName,
      email: response.user.email,
      url: response.user.photoURL,
    };

    console.log("object response", userObject);

    dispatch(loginUser(userObject));
    // const userResponse = await AddUser(userObject);
    Cookies.set("login", true);
    console.log("login success user added");
    // toast.success("user logged in successfully");
    
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
    console.log(error);
  }
}

export async function handleSignOut() {
  try {
    await logOut();
  } catch (error) {
    console.log(error);
  }
}
