import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {PromotionCreateForm} from '../../Components/form/Promotion.form'
import { useState } from 'react'
import PromotionList from '../../Components/List/PromotionList'
import Sidebar from '@/Components/html/Sidebar'
import Navbare from '@/Components/html/Navbar'

export default function Promotion () {
  const [isShown, setIsShown] = useState(false)
  const handleClick = (_envent: any): void => {
    setIsShown((current) => !current)
  }

  return (
    <div className="flex flex-col ">
      <div className="flex flex-1">
        <h1 className="flex-1 text-4xl">Promotions</h1>
        <button
         data-cy= 'add-promotion'
          id='add-promotion'
          type="button"
          onClick={handleClick}
          className="inline-flex items-center p-4 font-medium text-center bg-green-200 rounded-full tet-sm hover:bg-green-300 dark:hover:bg-green-500 dark:bg-green-400"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      {isShown && (
        <div>
          <h1>Crée une promotion</h1>
          <PromotionCreateForm />
        </div>
      )}
      <PromotionList />
    </div>
  )
}

Promotion.getLayout = (page) => (
  <div className='flex'>
  <Sidebar />
  <div className='flex flex-col flex-1'>
      <Navbare />
      {page}
  </div>
</div>
)
