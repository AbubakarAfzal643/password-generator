import { useCallback, useEffect, useRef, useState } from "react"

function App() {

  const [length, setLength] = useState(6)
  const [numberAllowed , setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed]  = useState(false)
  const [password , setPassword] = useState("")

  const passwordGenerator = useCallback(() => {

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed){
      str += '0123456789'
    }

    if(characterAllowed){
      str += '!@#$%^&*()_{}'
    }

    for(let i = 1; i <= length ; i++){
      let index = Math.floor(Math.random() * str.length  + 1)
      pass += str.charAt(index)
    }
    setPassword(pass)


  } , [length , numberAllowed , characterAllowed , setPassword])

 const passWordRef = useRef(null);

  useEffect(() => {
    passwordGenerator()
  }, [length, setNumberAllowed , setCharacterAllowed , passwordGenerator]);

   const CopyPassword = useCallback( () => {
    passWordRef.current?.select()
    passWordRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password)

   }  , [password])

  return (
    <>
    <div className="w-full max-w-md shadow-md mx-auto rounded-lg px-8 my-10 text-white bg-gray-700">
      <h1 className="text-white text-center text-2xl py-5"> Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input 
        type="text"
        value={password}
        className="outline-none bg-white w-full py-1 px-3 rounded text-black"
        placeholder="Password"
        readOnly
        ref={passWordRef}
         />
        <button 
        onClick = {CopyPassword}
        className="bg-blue-700
        outline-none shrink-0 rounded px-3 text-white hover:bg-white hover:text-blue-700 py-0.5 ">Copy</button>
      </div>
      <div className="flex text-sm  gap-x-2 pb-5">
        <div className="flex item-center gap-x-1 ">
          <input type="range"
          min={6}
          max={100}
          value={length}
          className="cursor-pointer" 
          onChange={(e) => setLength(e.target.value)}/>
          <label> Length : {length} </label>
        </div>
      <div className="flex item-center gap-x-1"> 
        <input 
        type="checkbox"
        defaultChecked = {numberAllowed}
        id = "numberInput"
        onChange={() =>{setNumberAllowed((prev) => !prev)}}/>
        <label className="text-yellow-500"> Number</label>

        <input 
        type="checkbox"
        defaultChecked = {characterAllowed}
        id = "characterInput"
        onChange={() =>{setCharacterAllowed((prev) => !prev)}}/>
        <label className="text-yellow-500"> Characters</label>
     </div>
    </div>
   </div>
    </>
  )
}
export default App
