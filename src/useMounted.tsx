import React, { useEffect, useRef, useState } from 'react'

export function useMounted(): boolean {
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return isMounted.current
}

export default function Mounted() {
  const [show, setShow] = useState(false)
  const [pressed, setPressed] = useState(false)
  const mounted = useMounted()

  useEffect(() => {
    if (mounted) {
      setShow(true) // this will only show after button is pressed
    }
    // setShow(true) // this will show on mount
  }, [pressed])

  return (
    <div>
      <p>{show ? 'pressed' : 'not pressed'}</p>
      <button onClick={() => setPressed(true)}>toggle</button>
    </div>
  )
}
