import React, { useState } from 'react'
import './App.css'
import ReactDnd from './DragAndDrop/DragAndDrop'
import Memo from './Memo'
import Mounted from './useMounted'
import UsePrevious from './UsePrevious'
// import SO from './SO'
import InfiniteScroll from './InifiniteScroll'

function App() {
  const [selection, setSelection] = useState('')
  return (
    <div
      style={{
        margin: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}
    >
      <h1 style={{ cursor: 'pointer' }} onClick={() => setSelection('')}>
        Tutorials
      </h1>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <li
          style={{
            cursor: 'pointer',
            color: selection === 'react-dnd' ? 'red' : 'blue'
          }}
          onClick={() => setSelection('react-dnd')}
        >
          react-dnd
        </li>
        <li
          style={{
            cursor: 'pointer',
            color: selection === 'use-previous' ? 'red' : 'blue'
          }}
          onClick={() => setSelection('use-previous')}
        >
          use-previous
        </li>
        <li
          style={{
            cursor: 'pointer',
            color: selection === 'use-memo' ? 'red' : 'blue'
          }}
          onClick={() => setSelection('use-memo')}
        >
          use-memo
        </li>
        <li
          style={{
            cursor: 'pointer',
            color: selection === 'use-mounted' ? 'red' : 'blue'
          }}
          onClick={() => setSelection('use-mounted')}
        >
          use-mounted
        </li>
        <li
          style={{
            cursor: 'pointer',
            color: selection === 'infinite-scroll' ? 'red' : 'blue'
          }}
          onClick={() => setSelection('infinite-scroll')}
        >
          infinite-scroll
        </li>
      </ul>
      {selection === 'react-dnd' && <ReactDnd />}
      {selection === 'use-previous' && <UsePrevious />}
      {selection === 'use-memo' && <Memo />}
      {selection === 'use-mounted' && <Mounted />}
      {selection === 'infinite-scroll' && <InfiniteScroll />}

      {/* <SO /> */}
    </div>
  )
}

export default App
