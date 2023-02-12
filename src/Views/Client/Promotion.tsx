import { faPlusSquare } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Promotionform from '../../Components/form/PromotionForm'
import { useState } from 'react'
import PromotionList from '../../Components/List/PromotionList'
export default function Promotion () {
  const [isShown, setIsShown] = useState(false)
  const handleClick = (_envent: any): void => {
    setIsShown((current) => !current)
  }

  return (
    <div className="container max-w-6xl mx-auto mt-4">
      <PromotionList />
      <div className="flex">
        <h1 className="flex-1 text-4xl">Promotion</h1>
        <button
          type="button"
          onClick={handleClick}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <FontAwesomeIcon icon={faPlusSquare} />
          Add Promotion
        </button>
      </div>
      {isShown && (
        <div>
          <h1>Add Promotion</h1>
          <Promotionform />
        </div>
      )}
      <PromotionList />
    </div>
  )
}
