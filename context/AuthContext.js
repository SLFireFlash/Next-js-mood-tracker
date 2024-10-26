'use client'
import { auth, db } from '@/firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React,{useContext,useState,useEffect} from 'react';


const AuthContext = React.createContext();

export function UseAuth (){
    return useContext(AuthContext);
}

export function AuthProvider ({children}){
    const [currentUser,setCurrectUser]= useState(null);
    const [userDataObj,setUserDataObj] = useState(null);
    const [loading,setLoading]=useState(true);

    //auth handler
    function signup (email,password){
        return createUserWithEmailAndPassword(auth,email,password)
    }

    function login(email,password){
        return signInWithEmailAndPassword(auth,email,password);
    }

    function logout(){
        setUserDataObj(null);
        setCurrectUser(null);
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,async (user)=>{
            try {
                //set user to local contect state
                setLoading(true);
                setCurrectUser(user);
                if(!user){
                    console.log('no user');
                    
                    return
                }
                
                //if user exsist fetch data
                console.log("fetching user")

                const  docRef =doc(db,'users',user.uid);
                const docSnap = await getDoc(docRef);
                let firebaseData = {}
                if(docSnap.exists()){
                    console.log("user found")
                    firebaseData = docSnap.data()
                    console.log(firebaseData);
                }
                setUserDataObj(firebaseData);


            } catch (error) {
                console.log(error.message);
            }finally{
                setLoading(false);
            }
        })
        return unsubscribe;
    },[])

    const value ={
        currentUser,
        userDataObj,
        signup,
        login,
        logout,
        loading,
        setUserDataObj
    }
    return(
        <AuthContext.Provider value={value}>
                {children}
        </AuthContext.Provider >
    )
}