import Header from "./Header";
import { useState , useRef } from "react";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../utils/firebase";
// import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userslice";
import { USER_AVATAR } from "../utils/constants";

const Login =()=>{
    const[isSignInform,setIsSignInform]= useState(true);
    const[errorMessage, setErrorMessage]= useState(null);
    // const navigate= useNavigate();
    const dispatch = useDispatch();


    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);

    const handleButtonClick =() =>{
        const message= checkValidData(email.current.value, password.current.value);
        setErrorMessage(message); 

        if(message) return;
        if(!isSignInform){
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                updateProfile(user, {
                    displayName: "name.current.value",
                    photoURL: USER_AVATAR ,
                  }).then(() => {
                    const {uid, email,displayName, photoURL} = auth.currentUser;
                    dispatch(
                        dispatch(addUser({uid:uid, email: email, displayName:displayName, photoURL:photoURL}))
                    );
                    // navigate("/browse")
                  })
                    .catch((error) => {
                        setErrorMessage(error.message);
                    });
                // navigate("/browse")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode+"-"+errorMessage)
  });
        }
        else{
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                // navigate("/browse")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode+"-"+errorMessage)
            });
        }
    }

    const toggleSignInForm =()=>{
        setIsSignInform(!isSignInform)
    }

    return(
        <div>
            <Header />
            <div className="absolute">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/2e07bc25-8b8f-4531-8e1f-7e5e33938793/e4b3c14a-684b-4fc4-b14f-2b486a4e9f4e/IN-en-20240219-popsignuptwoweeks-perspective_alpha_website_medium.jpg" 
                alt="body"></img>
            </div>
            <form onSubmit={(e)=>e.preventDefault()} className="p-12 bg-black bg-opacity-60 absolute my-36 mx-auto right-0 left-0 w-3/12 text-white rounded-lg">
                <h1 className="font-bold text-3xl py-1">
                    {isSignInform ? "Sign In" : "Sign Up"}
                </h1>
                <input type="text" 
                ref={email}
                placeholder="Email-Address" 
                className="p-4 my-2 w-full bg-gray-700" />

                <input type="text" 
                ref={password}
                placeholder="password" 
                className="p-4 my-2 w-full bg-gray-700" />

                {!isSignInform && (
                    <input type="text" 
                    ref={name}
                    placeholder="Full Name" 
                    className="p-4 my-2 w-full bg-gray-700" />
                )}

                <p className="text-red-500">{errorMessage}</p>

                <button className="p-4 my-2 bg-red-800 w-full rounded-lg" onClick={handleButtonClick}>
                {isSignInform ? "Sign In" : "Sign Up"}</button>

                <p className="py-4 cursor-pointer" 
                onClick= {toggleSignInForm}>
                {isSignInform ? "New to Netflix? Sign up Now" : "Already registered? Sign In Now."}
                </p>
            </form>
        </div>
    )
};
export default Login;
