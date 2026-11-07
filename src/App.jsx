import { useCallback, useEffect, useRef, useState } from 'react'


function App() {

 const [length , setLength] = useState(8) 
 const [numAllowed , setNumAllowed] = useState(false)
 const [charAllowed , setCharAllowed] = useState(false)
 const [password , setPassword] = useState("")

 const generatePassword = useCallback(() => {

let pass = ""
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

if(numAllowed) str += "0123456789";
if(charAllowed) str += "~!@#$%^&*()_{}`></?";

for (let i = 1; i <= length; i++) {
  let char = Math.floor(Math.random() * str.length + 1)

  pass += str.charAt(char)  
}
setPassword(pass)  
 } , [length , charAllowed , numAllowed , setPassword])


const reference = useRef()

const copypasswordtoClipboard = () => {
  reference.current?.select()
  reference.current?.setSelectionRange(0 , 30)
  window.navigator.clipboard.writeText(password)
}



useEffect(() => {
  generatePassword()
},[length , charAllowed , numAllowed, generatePassword])



  return(
    <div className='min-h-screen flex justify-center items-center bg-slate-950'>
    <div 
    className='w-full max-w-xl bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-8 md:p-10  '>
      <h1 className='text-3xl md:text-4xl font-extrabold tracking-tight bg-linear-to-r from-purple-400 to-pink-400 text-center py-4 bg-clip-text text-transparent'>Password Generator</h1>
      <div 
      className='flex items-center gap-2 bg-slate-900/90 border border-white/10 mt-8 rounded-xl p-3 ml-4 mr-4 '>
      <input
      id='password'
      name='password'
      type='password'
      value={password}
      placeholder='Password'
      className='w-full bg-transparent outline-none tracking-wider px-4 py-3 text-white text-xl '
      readOnly
      ref={reference}
      />
      <button className='bg-purple-600 px-5 font-semibold transition-all duration-300 py-3 cursor-pointer hover:bg-blue-400 rounded-xl '
      onClick={copypasswordtoClipboard}>Copy</button>
      </div>


      <div className='flex text-lg mt-10 ml-6 py-4'>
        <div 
        className=' flex '>
          <input
          id='range'
          type='range'
          value={length}
          className='cursor-pointer rounded-lg appearance-none bg-purple-900 accent-purple-500'
          onChange={(e) => {setLength(e.target.value)}}
        />  
        <label htmlFor = "range" className='text-amber-600 px-2 hover:border-purple-500 border border-white/10'> length : {length}</label>
        </div>

        <div className='flex '>
          <input
          id='checkbox'
          type='checkbox'
          defaultChecked = {numAllowed}
          className='cursor-pointer ml-3 accent-purple-500 bg-purple-500'
          onChange={() => {setNumAllowed((prev) => !prev);
          }}
          />
          <label htmlFor="checkbox" className='text-amber-600 px-2 hover:border-purple-500 border border-white/10'>Numbers</label>
        </div>
        
        <div className='flex '>
          <input
          id='check'
          type='checkbox'
          defaultChecked = {charAllowed}
          className='cursor-pointer ml-3 accent-purple-500 bg-purple-500 '
          onChange={() => {setCharAllowed((prev) => !prev)}}
          />
           <label htmlFor="check" className='text-amber-600 px-2 hover:border-purple-500 border border-white/10'>Characters</label>
        </div>

      </div>
      <div className=' flex justify-center text-center text-lg mt-10 py-3'>
        <div className=' '></div>
        <button className='bg-linear-to-r from-purple-600 to-pink-600 text-white text-3xl font-bold py-4 px-3 rounded-xl cursor-pointer hover:purple-500'
        onClick={generatePassword}
        >Generate Password</button>
      </div>
    </div>
    </div>
   
  )
}

export default App
