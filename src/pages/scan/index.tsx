import React, { useState } from 'react'
import {QrReader} from 'react-qr-reader'
import { BalanceServices } from '@/Api/Services'


export default function Scan () {
  const [data, setData] = useState('No result')
  const handleScan = (data: any) => {
    if (data) {
      setData(data)
      BalanceServices.checkout(data)
    }
  }
  const handleError = (err: any) => {
    console.error(err)
  }

  const handleConstraints = () => {
    
    return {
      facingMode: 'environment'
    }
  }
  
  return (
    <div className="container max-w-2xl mx-auto mt-4">
      <div className="flex">
        <h1 className="flex-1 text-4xl">Scan</h1>
      </div>
      <div>
        <QrReader
          onResult={(result, error) => {
            if (result) {
              handleScan(result)
            } else {
              handleError(error)
            }
          } } 
          constraints={handleConstraints()}
        />
        <p>{data}</p>
      </div>
    </div>
  )
}
