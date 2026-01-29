import { Button } from '@heroui/react'
import React, { useEffect, useRef, useState } from 'react'

export default function Test() {
    //  1- use memo
    // memo like useEffect but it run synchronise but useEffect Asynchronise
    // Ex =>

    const [num1, setNum1] = useState(0)
    const [num2, setNum2] = useState(0)
    const [isEven, setIsEven] = useState(null)

    // function isEven() {
    //     console.log('tt')
    //     return num1 % 2 == 0
    // }


    useEffect(() => {
        setIsEven(num1 % 2 == 0)
    }, [num1])


    const [y, setY] = useState('')



    // 2- useRef
    // useRef like useState but it keep values acroos renders and it not make renders if updated
    // ex =>
    // used in inputs to avoid many renders


    let userName = useRef()

    let renders = useRef(0)

    useEffect(()=>{
        renders.current++;
    })



    console.log(y)






    return <>
        <div className='flex justify-between w-lg mx-auto p-5 bg-green-700/10 text-white'>
            <div>
                <p>number1: {num1}</p>
                <Button onPress={() => { setNum1(num1 + 1) }} className='mt-2'>Increase</Button>
            </div>
            <div>
                <p>number2: {num2}</p>
                <Button onPress={() => { setNum2(num2 + 1) }} className='mt-2'>Increase</Button>
            </div>
        </div>
        <p className='my-4 mx-auto w-fit'>isEven: {isEven + ""}</p>
        <input ref={userName} className='p-2 rounded-md border w-lg mx-auto' type="text" />
        <input value={y} onChange={(e)=>{setY(e.target.value)}} className='p-2 rounded-md border w-lg mx-auto' type="text" />
        <Button onPress={()=>{console.log(userName.current.value)}}>show username</Button>

        <p className='mt-2'>renders count: {renders.current}</p>
    </>
}
