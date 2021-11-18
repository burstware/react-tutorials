import React, { useEffect, useMemo, useState } from 'react'

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
  console.log('child 1 rendered')
  return (
    <div>
      <div>{prop}</div>
    </div>
  )
}

const Child2Bare = ({ setProp }: { setProp: (prop: string) => void }) => {
  console.log('child 2 rendered')
  
  return (
    <button onClick={() => setProp(Math.random().toString())}>Change Prop</button>
  )
}

// const Child2 = Child2Bare
const Child2 = React.memo(Child2Bare)