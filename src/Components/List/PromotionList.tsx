import { useEffect, useState } from 'react'
import type Promotions from '../../Api/Models/Promotions'
import { PromotionService } from '../../Api/Services'
import { Placeholder } from 'semantic-ui-react'
export default function PromotionList (): JSX.Element {
  const [promotions, setPromotions] = useState<Promotions[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const loadPromotions = async (): Promise<void> => {
      try {
        setIsLoading(true)
        const response = await PromotionService.getPromotions()
        setPromotions(response.data)
      } catch (error) {
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }
    void loadPromotions()
  }, [])

  if (isLoading) {
    return (<div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>startAt</th>
              <th>endAt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <Placeholder>
                  <Placeholder.Line />
                </Placeholder>
              </th>
              <th>
                <Placeholder>
                  <Placeholder.Line />
                </Placeholder></th>
              <th>
                <Placeholder>
                  <Placeholder.Line />
                </Placeholder></th>
              <th>
                <Placeholder>
                  <Placeholder.Line />
                </Placeholder></th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>)
  }

  if (error) {
    return (
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>startAt</th>
              <th>endAt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colSpan={4} className='text-4xl font-bold text-center'>
                OH no! A error has occured....
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>startAt</th>
              <th>endAt</th>
            </tr>
          </thead>
          <tbody>
            {promotions.map((promotion) => (
              <tr key={promotion.name}>
                <th>{promotion.name}</th>
                <th>{promotion.description}</th>
                <th>{promotion.startAt}</th>
                <th>{promotion.endAt}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
