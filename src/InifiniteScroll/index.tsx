import React, { useCallback, useEffect, useReducer, useRef } from 'react'
import { useInfiniteScroll } from './utils'

const MAX_ITEMS = 150

interface Item {
  id: number
  name: string
  content: string
}

export default function InfiniteScroll() {
  const firstItemRef = useRef<HTMLElement>()
  // this useReducer maintains a buffer of items that will make sure it will not exceed MAX_ITEMS in length by popping out old items
  // when new items are added
  const [items, dispatchItems] = useReducer(
    (
      items: Item[],
      action: {
        type: 'append' | 'prepend'
        items: Item[]
      }
    ) => {
      if (action.items && !Array.isArray(action.items))
        action.items = [action.items]
      switch (action.type) {
        case 'prepend': {
          let newItems = [...action.items, ...items]
          newItems = newItems.slice(0, MAX_ITEMS)
          return newItems
        }
        case 'append': {
          let newItems = [...items, ...action.items]
          newItems = newItems.slice(Math.max(newItems.length - MAX_ITEMS, 0))
          return newItems
        }
        default:
          return items
      }
    },
    [] as Item[]
  )

  const generatePage = useCallback(
    (direction: 'up' | 'down' = 'down') => {
      const PAGE_SIZE = 50
      return new Array(PAGE_SIZE).fill('').map((_, i) => {
        if (direction === 'up') {
          const firstItem = items[0]?.id ?? 0
          return {
            id: firstItem - (PAGE_SIZE - i),
            name: `Item ${firstItem - (PAGE_SIZE - i)}`,
            content: `Content ${firstItem - (PAGE_SIZE - i)}`
          }
        } else {
          const lastItem = items[items.length - 1]?.id ?? 0
          return {
            id: lastItem + i + 1,
            name: `Item ${lastItem + i + 1}`,
            content: `Content ${lastItem + i + 1}`
          }
        }
      })
    },
    [items]
  )

  const { scrollableContainerRef, lastItem, firstItem } = useInfiniteScroll({
    onScrollToFirstItem: async () => {
      console.log('fetching newer items')
      // generate 20 random items
      const newItems = generatePage('up')
      console.log('newItems', newItems)
      dispatchItems({
        type: 'prepend',
        items: newItems
      })
    },
    onScrollToLastItem: async () => {
      console.log('fetching older items')
      // generate 20 random items
      const newItems = generatePage()
      console.log('newItems', newItems)
      dispatchItems({
        type: 'append',
        items: newItems
      })
    }
  })

  useEffect(() => {
    const newItems = generatePage()
    dispatchItems({
      type: 'append',
      items: newItems
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log('firstItemRef.current', firstItemRef.current)
  }, [items])

  const setFirstItemRefs = useCallback(
    (node) => {
      // Ref's from useRef needs to have the node assigned to `current`
      firstItemRef.current = node
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      firstItem(node)
    },
    [firstItem]
  )

  return (
    <div
      ref={scrollableContainerRef}
      style={{
        height: '300px',
        overflow: 'auto'
      }}
    >
      {items.map((item, i) => {
        let ref = null
        if (i === items.length - 1) ref = lastItem
        if (i === 0 && items.length >= MAX_ITEMS) ref = setFirstItemRefs
        return (
          <div key={item.id} ref={ref}>
            <div>{item.name}</div>
            <div>{item.content}</div>
          </div>
        )
      })}
    </div>
  )
}
