import ShopForm from '../../Components/form/ShopForm'
import ShopList from '../../Components/List/ShopList'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export default function Shops () {
    const [Shop, setShop] = useState(false)
    const handleClick3 = (_envent: any): void => {
        setShop((current) => !current)
    }
    return (
        <div className="container max-w-6xl mx-auto mt-4">
        <div className="flex">
            <h1 className="flex-1 text-4xl">Shops</h1>
            <button
            type="button"
            onClick={handleClick3}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
            <FontAwesomeIcon icon={faPlusSquare} />
            Create Shop
            </button>
        </div>
        {Shop && (
            <div>
            <ShopForm />
            </div>
        )}
        <ShopList />
        </div>
    )
    }
