import React, { useEffect, useState } from 'react'

export default function Memo() {
  const [prop, setProp] = useState('')

  // const child2 = useMemo(() => <Child2 setProp={setProp} />, [setProp])
  const child2 = <Child2 setProp={setProp} />

  return (
    <>
      <Child prop={prop} />
      {child2}
    </>
  )
}

function Child({ prop }: { prop: string }) {
  const [renderCount, setRenderCount] = useState(0)
  useEffect(() => {
    setRenderCount(renderCount + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prop])

  return (
    <div>
      <span>Child 1 render count {renderCount}</span>
      <div>prop value: {prop}</div>
    </div>
  )
}

const Child2Bare = ({ setProp }: { setProp: (prop: string) => void }) => {
  const [renderCount, setRenderCount] = useState(0)
  useEffect(() => {
    setRenderCount(renderCount + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setProp])

  return (
    <>
      <span>Child 2 render count {renderCount}</span>
      <button onClick={() => setProp(Math.random().toString())}>
        Change Prop
      </button>
    </>
  )
}

// const Child2 = Child2Bare
const Child2 = React.memo(Child2Bare)
