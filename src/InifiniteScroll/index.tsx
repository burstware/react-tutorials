import React, { cloneElement } from 'react'
import { LoadItemsParams, Loading, useInfiniteScroll } from './utils'

interface Props {
  maxBufferSize: number
  loadItems: LoadItemsParams['loadItems']
  triggerThresholdItems: number
}

/**
 * TODO: detect full buffer of items are visible, then increase buffer size
 * @returns
 */
export default function InfiniteScroll({
  maxBufferSize,
  loadItems,
  triggerThresholdItems
}: Props) {
  const {
    loading,
    scrollableContainerRef,
    items,
    preLastItem,
    lastItem,
    preFirstItem,
    firstItem
  } = useInfiniteScroll({
    loadItems,
    maxBufferSize
  })

  return (
    <div
      ref={scrollableContainerRef}
      style={{
        height: '100%',
        width: '100%',
        overflow: 'auto'
      }}
    >
      {loading === Loading.UP && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <p>Loading...</p>
        </div>
      )}
      {items.map((item, i) => {
        let ref = null
        if (i === items.length - triggerThresholdItems - 1) {
          ref = preLastItem
        } else if (i === items.length - 1) {
          ref = lastItem
        } else if (i === triggerThresholdItems - 1) {
          ref = preFirstItem
        } else if (i === 0) {
          ref = firstItem
        }

        if (ref !== null) {
          return cloneElement(item, { ref })
        }
        return item
      })}

      {loading === Loading.DOWN && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <p>Loading...</p>
        </div>
      )}
    </div>
  )
}
