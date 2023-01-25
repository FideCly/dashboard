import { faPlusSquare } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import Cardform from '../../Components/form/CardForm'
import ShopForm from '../../Components/form/ShopForm'
import ShopList from '../../Components/List/ShopList'
export default function GeneralSettings (): JSX.Element {
  const [Card, setCard] = useState(false)
  const [Shop, setShop] = useState(false)
  const handleClick2 = (_envent: any): void => {
    setCard((current) => !current)
  }
  const handleClick3 = (_envent: any): void => {
    setShop((current) => !current)
  }
  return (
    <div className="container max-w-6xl mx-auto mt-4">
      <div className="flex m-4">
        <h1 className="flex-1 text-4xl">Settings</h1>
        <button
          type="button"
          onClick={handleClick2}
          className=""
        >
          <FontAwesomeIcon icon={faPlusSquare} />
          Edit card
        </button>
        <button
          type="button"
          onClick={handleClick3}
          className=""
        >
          <FontAwesomeIcon icon={faPlusSquare} />
          Create Shop
        </button>
      </div>
      {Card && (
        <div>
          <h1>Edit card</h1>
          <Cardform />
        </div>
      )}
      {Shop && (
        <div>
          <ShopForm />
        </div>
      )}
      <ShopList />
    </div>
  )
}
