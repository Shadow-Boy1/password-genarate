import { useCallback, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './component/card'


function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [Password, setPassword] = useState("")

  const passwordGenator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIKLMNOPQRSTVXYZabcdefghiklmnopqrstvxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "*%!#&-+{}"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  function copied(){
    
    window.navigator.clipboard.writeText(Password)
  }

  useEffect(()=>{
    passwordGenator();
  },[length, numberAllowed, charAllowed, setPassword])

  return (
    <>

     <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500">
      <input type="text" value={Password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly />
      <button className='' onClick={copied}>copy</button>
    
     </div>

     <div className='flex'>
      <div className="flex">
        <input type="range" 
        min = {6}
        max = {100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{setlength(e.target.value)} }
        />
       <label>length : {length}</label>
      </div>
      <div className='flex'>
        <input type="checkbox" 
        defaultChecked = {numberAllowed}
        id= "numberinput"
        onChange={()=>{
         setnumberAllowed((prev)=>!prev)
        }}
        />
        <label>numbers</label>
      </div>
      <div className='flex'>
        <input type="checkbox" 
        defaultChecked = {charAllowed}
        id= "numberinput"
        onChange={()=>{
          setCharAllowed((prev)=>!prev)
        }}
        />
        <label>characters</label>
      </div>
     </div>


    </>
  )
}

export default App
