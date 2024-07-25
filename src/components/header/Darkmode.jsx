import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {changeMode} from '../../store/darkmode'

const Darkmode = () => {

    const [mode , setMode ] = useState('light')
    const dispatch = useDispatch()

    const handleToggle = ()=>{
        mode == 'light' ? setMode('dark') : setMode('light')
        dispatch(changeMode(mode))
    }

  return (
    <div onClick={handleToggle}
     className='h-7 w-[3.2rem] cursor-pointer rounded-xl dark:bg-gray-100 bg-gray-800 relative mt-2'>
        <div className='h-full w-6 rounded-full dark:bg-gray-800 bg-gray-100 absolute dark:left-0  right-0'></div>
    </div>
  )
}

export default Darkmode