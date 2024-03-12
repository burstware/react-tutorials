import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react'
import { useInfiniteScroll } from './utils'

const MAX_BUFFER_SIZE = 150

interface Item {
  id: number
  name: string
  content: string
}

export default function InfiniteScroll() {
  const previousScroll = useRef<{
    height?: number
    yLocation?: number
    state: 'render' | 'done'
  }>({
    height: undefined,
    yLocation: undefined,
    state: 'done'
  })
  const [loading, setLoading] = useState('')

  function stopWatching() {
    firstItem(null)
    preFirstItem(null)
    lastItem(null)
    preLastItem(null)
  }

  const fetchItems = async (direction: 'up' | 'down' = 'down') => {
    // TODO: prevent unecessary fetching (when it returns empty, don't keep attempting)
    return new Promise<void>((resolve) => {
      setLoading(direction)
      stopWatching()
      setTimeout(async () => {
        const newItems = generatePage(direction)
        dispatchItems({
          type: direction === 'up' ? 'prepend' : 'append',
          items: newItems
        })
        setLoading('')
        resolve()
      }, 500)
    })
  }

  const {
    scrollableContainerRef,
    preFirstItem,
    firstItem,
    preLastItem,
    lastItem
  } = useInfiniteScroll({
    onScrollToFirstItem: async () => {
      firstItem(null)
      fetchItems('up')
    },
    onScrollToLastItem: async () => {
      console.log('onScrollToLastItem')
      fetchItems('down')
    }
  })

  // this useReducer maintains a buffer of items that will make sure it will not exceed MAX_BUFFER_SIZE in length by popping out old items
  // when new items are added
  const [items, dispatchItems] = useReducer(
    (
      items: Item[],
      action: {
        type: 'append' | 'prepend' | 'cleanup'
        items?: Item[]
      }
    ) => {
      if (action.items && !Array.isArray(action.items))
        action.items = [action.items]
      switch (action.type) {
        case 'prepend': {
          const newItems = [...(action?.items ?? []), ...items]
          if (previousScroll.current && scrollableContainerRef.current) {
            previousScroll.current.height =
              scrollableContainerRef.current.scrollHeight ?? 0
            previousScroll.current.yLocation =
              scrollableContainerRef.current.scrollTop
          }
          previousScroll.current.state = 'render'
          return newItems
        }
        case 'append': {
          let newItems = [...items, ...(action?.items ?? [])]
          newItems = newItems.slice(
            Math.max(newItems.length - MAX_BUFFER_SIZE, 0)
          )
          return newItems
        }
        case 'cleanup': {
          // clean up after prepending
          const newItems = items.slice(0, MAX_BUFFER_SIZE)
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

  console.log('previousScroll.current', previousScroll.current)

  // scroll to last item if scrolling up
  useEffect(() => {
    if (previousScroll.current.state !== 'done') {
      if (
        scrollableContainerRef.current &&
        previousScroll.current.height !== undefined && // these are undefined if scrolling down
        previousScroll.current.yLocation !== undefined // these are undefined if scrolling down
      ) {
        const addedHeight =
          scrollableContainerRef.current.scrollHeight -
          previousScroll.current.height

        let newLocation = addedHeight + previousScroll.current?.yLocation

        console.log('newLocation', newLocation)

        scrollableContainerRef.current.scroll({
          top: newLocation
        })
      }

      dispatchItems({
        type: 'cleanup'
      })
      previousScroll.current.state = 'done'
    }
  }, [items, scrollableContainerRef])

  // fetch initial items
  useEffect(() => {
    fetchItems('down')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={scrollableContainerRef}
      style={{
        height: '500px',
        overflow: 'auto',
        background: '#dddddd'
      }}
    >
      {loading === 'up' && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <p>Loading...</p>
        </div>
      )}
      {items.map((item, i) => {
        let ref = null
        // if (i === items.length - 26) ref = preLastItem
        if (i === items.length - 1) ref = lastItem
        // if (i === 24) ref = preFirstItem
        if (i === 0) ref = firstItem
        return (
          <div key={item.id} ref={ref}>
            <div>{item.name}</div>
            <div>{item.content}</div>
          </div>
        )
      })}
      {loading === 'down' && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <p>Loading...</p>
        </div>
      )}
    </div>
  )
}
