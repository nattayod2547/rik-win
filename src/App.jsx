import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RandomChance from './components/RandomChance'





function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className=''>
        <div className='w-full flex items-center justify-center'>
        <div className=''>
          <RandomChance/>
      </div>
      </div>
    </div>


    
    </>
  )
}

export default App
