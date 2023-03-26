import {QrReader} from 'react-qr-reader'
import React, { useState } from 'react'
import { PromotionService, BalanceServices } from '@/Api/Services'

export const ScanQRCode: React.FC = () => {
    const [data, setData] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const handleConstraints = () => {  
        return {
          facingMode: 'environment'
        }
      }
    
    return (
        <div>
            <QrReader
            onResult={(result, error) => {
            if (result) {
              setData(result.getText())
              BalanceServices.checkout(result.getText()).then((response) => {
                console.log(response)
              })
              .catch((e) => {
                console.log(e)
              })
            }
            if (error) {
              console.log(error)
            }
          }} 
          constraints={handleConstraints()}
        />
        {data?.length > 0 && 
          <div>
            <p>{data}</p>
          </div>
        }
        </div>
    )
}
