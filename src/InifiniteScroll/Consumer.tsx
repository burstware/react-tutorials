import React, { ReactElement, useCallback } from 'react'
import InfiniteScroll from '.'
import { PaginationQuery } from './utils'

const MAX_BUFFER_SIZE = 150

interface Item {
  id: number
  name: string
  content: string
}

export default function Consumer() {
  const fetchItems = useCallback((query: PaginationQuery) => {
    return new Promise<ReactElement[]>((resolve) => {
      setTimeout(() => {
        // Fetch from API using before/after
        const items: Item[] = generatePage(
          query.before ? 'up' : 'down',
          query.before as unknown as undefined,
          query.after as unknown as undefined
        )

        // eslint-disable-next-line react-hooks/exhaustive-deps
        resolve(items.map((item: Item) => <div key={item.id}>{item.name}</div>))
      }, 500)
    })
  }, [])

  const generatePage = useCallback(
    (direction: 'up' | 'down' = 'down', before?: number, after?: number) => {
      const PAGE_SIZE = 50
      return new Array(PAGE_SIZE).fill('').map((_, i) => {
        if (direction === 'up') {
          const firstItem = +(before ?? 0)
          return {
            id: firstItem - (PAGE_SIZE - i),
            name: `Item ${firstItem - (PAGE_SIZE - i)}`,
            content: `Content ${firstItem - (PAGE_SIZE - i)}`
          }
        } else {
          const lastItem = +(after ?? 0)
          return {
            id: lastItem + i + 1,
            name: `Item ${lastItem + i + 1}`,
            content: `Content ${lastItem + i + 1}`
          }
        }
      })
    },
    []
  )

  const handleLoadItems = async (query: PaginationQuery) => {
    return fetchItems(query)
  }

  return (
    <div
      style={{
        height: '500px'
      }}
    >
      <InfiniteScroll
        maxBufferSize={MAX_BUFFER_SIZE}
        loadItems={handleLoadItems}
        triggerThresholdItems={MAX_BUFFER_SIZE / 6}
      ></InfiniteScroll>
    </div>
  )
}
