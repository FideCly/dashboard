import ShopList from '../../Components/List/ShopList'
import { ShopCreateForm } from '@/Components/form/Shop.form'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import Sidebar from '@/Components/html/Sidebar'
import Navbare from '@/Components/html/Navbar'

export default function Shops () {
    const [isShown, setIsShown] = useState(false)
    const handleClick = (_envent: any): void => {
        setIsShown((current) => !current)
    }
    return (
        <div className="flex flex-col ">
            <div className="flex flex-1">
                <h1 className="flex-1 text-4xl">Boutique</h1>
                <button
                    type="button"
                    onClick={handleClick}
                    className="inline-flex items-center p-4 font-medium text-center bg-green-200 rounded-full tet-sm hover:bg-green-300"
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            {isShown && (
                <div>
                    <h1>Crée une boutique</h1>
                    <ShopCreateForm />
                </div>
            )}
            <ShopList />
        </div>
    )
}

Shops.getLayout = (page) => (
    <div className='flex'>
        <Sidebar />
        <div className='flex flex-col flex-1'>
            <Navbare />
            {page}
        </div>
    </div>
)
