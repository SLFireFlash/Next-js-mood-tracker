'use client'
import React,{useState} from 'react'
import { Fugaz_One,Open_Sans } from 'next/font/google';
import Button from './Button';
import { UseAuth } from '@/context/AuthContext';

const fugaz = Fugaz_One({
  weight: ['400'], 
  subsets: ['latin'],
  display: 'swap', 
  adjustFontFallback: false
});

export default function Login() {
  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const[isRegistered,setIsRegisted]= useState(false);
  const {signup,login} = UseAuth();
  const [authenticating,setAuthenticating]= useState(false);

  async function handleSubmit(){
    if(!email || !password ){
      return
    }
    setAuthenticating(true)
    try {
      if(isRegistered){
        console.log("login")
        await login(email,password);
      }else{
        console.log("register");
        await signup(email,password);
      }
    } catch (error) {
      console.log(error.message)
    }finally{
      setAuthenticating(false);
    }

  }
  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
        <h3 className={"text-4xl sm:text-5xl  md:text-6xl " +  fugaz.className}>{isRegistered? 'Login':'Register'}</h3>
        <p> You&#39;re one step away!</p>
        <input onChange={(e)=>{setEmail(e.target.value)}} type="email" value={email} className="max-w-[400px] w-full mx-auto px-4 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none duration-200 hover:border-indigo-600 focus:border-indigo-600" placeholder="email"/>
        <input onChange={(e)=>{setPassword(e.target.value)}}type="password" value={password} className="max-w-[400px] w-full mx-auto px-4 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none duration-200 hover:border-indigo-600 focus:border-indigo-600" placeholder="password"/>
        <div className="max-w-[400px] w-full mx-auto">
            <Button  clickHandler={handleSubmit} text={authenticating ? 'submitting':'submit'} full/>
        </div>

        <p className="text-center">don&#39;t dont have an account? <span className="text-indigo-600"> sign up</span></p>
    </div>
  )
}
