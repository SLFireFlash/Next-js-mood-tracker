'use client'
import React,{useContext,useState,useEffect} from 'react'
import { Fugaz_One,Open_Sans } from 'next/font/google';
import Calender from './Calender';
import { UseAuth } from '@/context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import Login from './Login';
import LoadingComp from './LoadingComp';
import { db } from '@/firebase';


const fugaz = Fugaz_One({
  weight: ['400'], 
  subsets: ['latin'],
  display: 'swap', 
  adjustFontFallback: false
});

export default function Dashboard() {

  const {currentUser,userDataObj,setUserDataObj,loading} = UseAuth()
  const [data,setData] = useState(null);
  
  function CountValues (){
    
  }
  async function handleSetMood (mood){
    const now = new Date();
    const day = now.getDate();
    const year = now.getFullYear();
    const month = now.getMonth()
    try {
      const NewData = {... userDataObj}
      if(!NewData?.[year]){
        NewData[year]= {}
      }
      if(!NewData?.[year]?.[month]){
        NewData[year][month]={}
      }
  
      NewData[year][month][day]= mood;
      setData(NewData)
      setUserDataObj(NewData);

      const docRef = doc(db,'users',currentUser.uid);
      const res = await setDoc(docRef,{
          [year]:{
            [month]:{
              [day]:mood
            }
          }
      },{merge : true});

    } catch (error) {
      console.log(error.message);
      
    }
  }
  const statuses = {
    num_days:14,
    time_remaining: '13:14:26',
    date:(new Date()).toDateString()
  }
  const moods ={
    '#$!#*':" 😡 ",
    'sad':" 😭 ",
    'Existing':" 😝 ",
    'Good':" 😊 ",
    'Elated':" 😍 "
  }

  useEffect(() => {
    if(!currentUser || !userDataObj){
      return
    }
    setData(userDataObj);
  }, [currentUser,userDataObj])
  
  if(loading){
    return <LoadingComp/>
  }
  if(!currentUser){
    return <Login/>
  }

  return (
    <div className="flex flex-col flex-1 gap-10 sm:gap-14">
      <div className="grid grid-cols-3 bg-indigo-50 text-indigo-500 rounded-lg p-4 gap-4">
        {
          Object.keys(statuses).map((status,statusIndex)=>{
            return(
              <div key={statusIndex} className="text=xs sm:text-sm flex flex-col gap-1 sm:gap-2">
                <p className="font-medium uppercase truncate ">{status.replaceAll('_',' ')}</p>
                <p className={"text-base sm:text-lg truncate "+ fugaz.className}>{statuses[status]}</p>
              </div>
            )
          })
        }
      </div>
      <h4 className={"text-5xl sm:text-6xl md:text-7xl text-center " + fugaz.className}>
        How do you <span className="textGradient">feel</span> today ?
      </h4>
      <div className="flex items-stretech flex-wrap gap-4">
        {
          Object.keys(moods).map((mood,moodIndex)=>{
            return(
              <button onClick={()=>{
                const currentMoodValue = moodIndex +1;
                handleSetMood(currentMoodValue);
              }} key={moodIndex} className={'p-4 px-5 rounded-lg purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-100 text-center flex flex-col gap-2 items-center flex-1 '}>
                <p className={'text-5xl sm:text-6xl md:text-7xl '+ fugaz.className}>{moods[mood]}</p>
                <p className={'text-indigo-500 text-xs sm:text-sm md:text-base '+ fugaz.className}>{mood}</p>
              </button>
            )
          })
        }
      </div>
      <Calender data={data} hadleSetMood={handleSetMood}/>
    </div>
  )
}
