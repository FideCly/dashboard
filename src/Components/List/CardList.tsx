import { useEffect, useState } from 'react'
import type Card from '../../Api/Models/Card'
import { CardService } from '../../Api/Services'
export default function CardList () {
  const [cards, setCards] = useState<Card[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const loadCards = async (): Promise<void> => {
      try {
        setIsLoading(true)
        const response = await CardService.getCards()
        setCards(response.data)
      } catch (error) {
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }
    void loadCards()
  }, [])

  if (isLoading) {
    return <div>loading....</div>
  }

  if (error) {
    return (
      <div>
        <span>Error while loading cards</span>
      </div>
    )
  }

  return (
    <div>
      {cards.map((card) => (
        <div key={card.name}>
          <span>{card.startAt.toString()}</span>
          <span>{card.endAt.toString()}</span>
        </div>
      ))}
    </div>
  )
}
