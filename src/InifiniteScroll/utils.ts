import { useRef } from 'react'
import { useInView } from 'react-intersection-observer'

interface Props {
  onScrollToFirstItem?: () => Promise<unknown>
  onScrollToLastItem?: () => Promise<unknown>
}

export function useInfiniteScroll({
  onScrollToFirstItem,
  onScrollToLastItem
}: Props) {
  const scrollableContainerRef = useRef<HTMLDivElement>(null)
  const [lastItem] = useInView({
    onChange: (inView) => {
      if (!inView) return
      lastItem(null)
      if (onScrollToLastItem) onScrollToLastItem()
    }
  })
  const [preLastItem] = useInView({
    onChange: (inView) => {
      if (!inView) return
      preLastItem(null)
      if (onScrollToLastItem) onScrollToLastItem()
    }
  })
  const [firstItem] = useInView({
    onChange: (inView) => {
      if (!inView) return
      firstItem(null)
      if (onScrollToFirstItem) onScrollToFirstItem()
    }
  })
  const [preFirstItem] = useInView({
    onChange: (inView) => {
      if (!inView) return
      preFirstItem(null)
      if (onScrollToFirstItem) onScrollToFirstItem()
    }
  })

  return {
    scrollableContainerRef,
    preLastItem,
    lastItem,
    preFirstItem,
    firstItem
  }
}
