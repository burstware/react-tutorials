// REMOVEME:
/* eslint-disable no-unused-vars */
import {
  ReactElement,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react'
import { useInView } from 'react-intersection-observer'

export interface PaginationQuery {
  before?: string | null
  after?: string | null
}

export enum Loading {
  UP = 'up',
  DOWN = 'down'
}

enum ActionType {
  APPEND = 'append',
  PREPEND = 'prepend',
  CLEANUP = 'cleanup'
}

export interface LoadItemsParams {
  loadItems: (query: PaginationQuery) => Promise<ReactElement[]>
  maxBufferSize: number
}

export function useInfiniteScroll({
  loadItems,
  maxBufferSize
}: LoadItemsParams) {
  const scrollableContainerRef = useRef<HTMLDivElement>(null)
  const previousScroll = useRef<{
    height?: number
    yLocation?: number
    rendering: boolean
  }>({
    height: undefined,
    yLocation: undefined,
    rendering: false
  })
  const [loading, setLoading] = useState<Loading | undefined>(undefined)
  // this useReducer maintains a buffer of items that will make sure it will not exceed MAX_BUFFER_SIZE in length by popping out old items
  // when new items are added
  const [items, dispatchItems] = useReducer(
    (
      items: ReactElement[],
      action: {
        type: ActionType
        items?: ReactElement[]
      }
    ) => {
      if (action.items && !Array.isArray(action.items))
        action.items = [action.items]
      switch (action.type) {
        case ActionType.PREPEND: {
          const newItems = [...(action?.items ?? []), ...items]
          if (previousScroll.current && scrollableContainerRef.current) {
            previousScroll.current.height =
              scrollableContainerRef.current.scrollHeight ?? 0
            previousScroll.current.yLocation =
              scrollableContainerRef.current.scrollTop
          }
          previousScroll.current.rendering = true
          return newItems
        }
        case ActionType.APPEND: {
          let newItems = [...items, ...(action?.items ?? [])]
          newItems = newItems.slice(
            Math.max(newItems.length - maxBufferSize, 0)
          )
          return newItems
        }
        case ActionType.CLEANUP: {
          // clean up after prepending
          const newItems = items.slice(0, maxBufferSize)
          return newItems
        }
        default:
          return items
      }
    },
    []
  )

  // scroll to last item if scrolling up
  useEffect(() => {
    if (previousScroll.current.rendering) {
      if (
        scrollableContainerRef.current &&
        previousScroll.current.height !== undefined && // these are undefined if scrolling down
        previousScroll.current.yLocation !== undefined // these are undefined if scrolling down
      ) {
        const addedHeight =
          scrollableContainerRef.current.scrollHeight -
          previousScroll.current.height

        let newLocation = addedHeight + previousScroll.current?.yLocation

        scrollableContainerRef.current.scroll({
          top: newLocation
        })
      }

      dispatchItems({
        type: ActionType.CLEANUP
      })
      previousScroll.current.rendering = false
    }
  }, [items, scrollableContainerRef])

  const getItems = useCallback(
    async (query: PaginationQuery) => {
      setLoading(query.before ? Loading.UP : Loading.DOWN)
      const items = await loadItems(query)
      dispatchItems({
        type: query.before ? ActionType.PREPEND : ActionType.APPEND,
        items
      })
      setLoading(undefined)
    },
    [loadItems]
  )

  // fetch initial items
  useEffect(() => {
    getItems({})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [lastItem] = useInView({
    onChange: (inView) => {
      if (!inView) return
      lastItem(null)
      preLastItem(null)
      getItems({
        after: items[items.length - 1].key
      })
    }
  })
  const [preLastItem] = useInView({
    onChange: (inView) => {
      if (!inView) return
      lastItem(null)
      preLastItem(null)
      getItems({
        after: items[items.length - 1].key
      })
    }
  })
  const [firstItem] = useInView({
    onChange: (inView) => {
      if (!inView) return
      firstItem(null)
      preFirstItem(null)
      getItems({
        before: items[0].key
      })
    }
  })
  const [preFirstItem] = useInView({
    onChange: (inView) => {
      if (!inView) return
      firstItem(null)
      preFirstItem(null)
      getItems({
        before: items[0].key
      })
    }
  })

  return {
    scrollableContainerRef,
    loading,
    items,
    preLastItem,
    lastItem,
    preFirstItem,
    firstItem
  }
}
