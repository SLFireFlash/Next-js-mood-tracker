
import React from 'react'
import { Fugaz_One } from 'next/font/google';
import Link from 'next/link';
import Button from './Button';
import Calender from './Calender';


const fugaz = Fugaz_One({
  weight: ['400'], 
  subsets: ['latin'],
  display: 'swap', 
  adjustFontFallback: false
});

export default function Hero() {
  return (
    <div className="py-4 md:pt-10 flex flex-col gap-4 sm:gap-8 mx-auto">
        <h1 className={'text-5xl sm:text-text-6xl md:text-7xl text-center ' + fugaz.className}>
            <span className= "textGradient">Moodly </span>
             track your  
            <span className= "textGradient"> daily </span>
            mood!
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-center w-full mx-auto max-w[600px]">
            Cteate your mood record and see how you feel on 
            <span className="font-semibold"> every day of the year</span>
        </p>

        <div className="grid grid-cols-2 gap-4 w-fit mx-auto">
          <Link href={'/dashboard'}>
            <Button text="login" />
          </Link>
          <Link href={'/dashboard'}>
          <Button text="Sign Up" dark />
          </Link>
        </div>
        
        <Calender demo/>

    </div>
  )
}
