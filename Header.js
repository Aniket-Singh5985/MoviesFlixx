import {signOut} from "firebase/auth";
import {auth} from "../utils/firebase"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userslice";
import { removeUser } from "../utils/userslice";
import { LOGO } from "../utils/constants";

const Header =()=>{
    const dispatch= useDispatch();
    const navigate=useNavigate();
    const user = useSelector(store=>store.user)
    const handleSignOut=()=>{
        signOut(auth)
        .then(() => {
        }).catch((error) => {
            navigate("./error");
        });
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              const {uid, email,displayName, photoURL} = user;
              dispatch(addUser({uid:uid, email: email, displayName:displayName, photoURL:photoURL}));
              navigate("/browse"); 
            } else {
                dispatch(removeUser());
                navigate("/");
            }
          });
          return ()=> unsubscribe();
    },[]);
    return(
        <div className="w-screen absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between ">
            <img 
            className="w-44"
            src={LOGO} alt="logo"></img>
            {user && (<div className="flex p-2">
                <img className="w-12 h-12" alt='user-icon' src={user?.photoURL}/>
                <button className="font-bold text-white" text-2xl onClick={handleSignOut}>Sign Out</button>
            </div>)
            }
        </div>
    )
};
export default Header;